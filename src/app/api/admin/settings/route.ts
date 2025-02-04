import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import SystemSetting from '@/models/SystemSetting';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


export async function GET() {
  try {
    await connectToDatabase();

   
    const settings = await SystemSetting.find({})
      .sort({ category: 1, key: 1 });

    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push({
        id: setting._id.toString(),
        key: setting.key,
        value: setting.value,
        label: setting.label,
        description: setting.description,
        type: setting.type,
        validation: setting.validation,
        updatedAt: setting.updatedAt,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json(groupedSettings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session : any= await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const updates = await request.json();
    
    // Validate updates format
    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      updates.map(async ({ key, value }) => {
        const setting = await SystemSetting.findOne({ key });
        
        if (!setting) {
          return { key, status: 'error', message: 'Setting not found' };
        }

        // Validate value type
        const valueType = typeof value;
        if (setting.type === 'number' && valueType !== 'number') {
          return { key, status: 'error', message: 'Invalid value type' };
        }
        if (setting.type === 'boolean' && valueType !== 'boolean') {
          return { key, status: 'error', message: 'Invalid value type' };
        }
        if (setting.type === 'json') {
          try {
            if (typeof value === 'string') {
              JSON.parse(value);
            }
          } catch {
            return { key, status: 'error', message: 'Invalid JSON value' };
          }
        }

        // Validate number constraints
        if (setting.type === 'number' && setting.validation) {
          if (typeof setting.validation.min === 'number' && value < setting.validation.min) {
            return { key, status: 'error', message: `Value must be at least ${setting.validation.min}` };
          }
          if (typeof setting.validation.max === 'number' && value > setting.validation.max) {
            return { key, status: 'error', message: `Value must be at most ${setting.validation.max}` };
          }
        }

        // Validate string pattern
        if (setting.type === 'string' && setting.validation?.pattern) {
          const regex = new RegExp(setting.validation.pattern);
          if (!regex.test(value)) {
            return { key, status: 'error', message: 'Value does not match required pattern' };
          }
        }

        // Validate options
        if (setting.validation?.options && !setting.validation.options.includes(value)) {
          return { key, status: 'error', message: 'Value not in allowed options' };
        }

        setting.value = value;
        setting.updatedBy = session.user.id;
        await setting.save();

        return { key, status: 'success' };
      })
    );

    const hasErrors = results.some(r => r.status === 'error');
    if (hasErrors) {
      return NextResponse.json(
        { results },
        { status: 400 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
