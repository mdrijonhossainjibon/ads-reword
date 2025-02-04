import crypto from 'crypto';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export async function verifyTelegramWebAppData(initData: string): Promise<TelegramUser | null> {
  try {
    // Get the bot token from environment variable
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    // Parse the initData string into key-value pairs
    const searchParams = new URLSearchParams(initData);
    const hash = searchParams.get('hash');
    searchParams.delete('hash');

    // Sort the parameters alphabetically
    const sortedParams = Array.from(searchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create a secret key from the bot token
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Calculate the hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(sortedParams)
      .digest('hex');

    // Verify the hash
    if (hash !== calculatedHash) {
      return null;
    }

    // Parse and return user data
    const userData = searchParams.get('user');
    if (!userData) return null;

    return JSON.parse(userData) as TelegramUser;
  } catch (error) {
    console.error('Error verifying Telegram Web App data:', error);
    return null;
  }
}
