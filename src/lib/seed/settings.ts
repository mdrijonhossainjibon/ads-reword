import { connectToDatabase } from '../mongoose';
import SystemSetting from '@/models/SystemSetting';

const defaultSettings = [
  // Telegram Bot Settings
  {
    category: 'telegram',
    key: 'telegram_bot_token',
    value: '',
    label: 'Bot Token',
    description: 'Your Telegram Bot Token from @BotFather',
    type: 'string',
    validation: {
      pattern: '^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$'
    }
  },
  {
    category: 'telegram',
    key: 'telegram_admin_chat_id',
    value: '',
    label: 'Admin Chat ID',
    description: 'Telegram Chat ID for admin notifications',
    type: 'string'
  },
  
  // Payment Settings
  {
    category: 'payments',
    key: 'payment_currency',
    value: 'USD',
    label: 'Currency',
    description: 'Default currency for payments',
    type: 'string',
    validation: {
      options: ['USD', 'EUR', 'GBP']
    }
  },
  {
    category: 'payments',
    key: 'payment_min_deposit',
    value: 10,
    label: 'Minimum Deposit',
    description: 'Minimum amount for deposits',
    type: 'number',
    validation: {
      min: 1,
      max: 1000
    }
  },
  
  // Points Settings
  {
    category: 'points',
    key: 'points_per_ad',
    value: 5,
    label: 'Points per Ad',
    description: 'Number of points earned per ad view',
    type: 'number',
    validation: {
      min: 1,
      max: 100
    }
  },
  
  // Ads Settings
  {
    category: 'ads',
    key: 'ads_max_active',
    value: 5,
    label: 'Maximum Active Ads',
    description: 'Maximum number of active ads per user',
    type: 'number',
    validation: {
      min: 1,
      max: 20
    }
  },
  {
    category: 'ads',
    key: 'ads_auto_approve',
    value: false,
    label: 'Auto Approve Ads',
    description: 'Automatically approve new ads',
    type: 'boolean'
  },
  
  // System Settings
  {
    category: 'system',
    key: 'system_maintenance_mode',
    value: false,
    label: 'Maintenance Mode',
    description: 'Enable maintenance mode',
    type: 'boolean'
  },
  {
    category: 'notifications',
    key: 'notification_email',
    value: '',
    label: 'Notification Email',
    description: 'Email address for system notifications',
    type: 'string',
    validation: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    }
  },
  
  // Security Settings
  {
    category: 'security',
    key: 'security_max_login_attempts',
    value: 5,
    label: 'Max Login Attempts',
    description: 'Maximum number of login attempts before lockout',
    type: 'number',
    validation: {
      min: 1,
      max: 10
    }
  }
];

export async function seedSettings() {
  try {
    await connectToDatabase();
    
    // Clear existing settings
    await SystemSetting.deleteMany({});
    
    // Insert default settings
    await SystemSetting.insertMany(defaultSettings);
    
    console.log('Settings seeded successfully');
  } catch (error) {
    console.error('Error seeding settings:', error);
    throw error;
  }
}
