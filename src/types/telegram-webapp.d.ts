interface TelegramWebApps {
  WebApp: {
    initDataUnsafe: {
      user?: {
        username?: string;
        first_name : string;
        last_name : string;
        id : number;
      };
    };
    // Add other WebApp properties as needed
  };
}

interface Window {
  Telegram?: TelegramWebApps;
}
