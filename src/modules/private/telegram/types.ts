export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface TelegramState {
  user: TelegramUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken?: string;
}

export const TELEGRAM_INITIAL_STATE: TelegramState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: undefined
};
