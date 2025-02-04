import { useEffect, useState } from 'react';



interface TelegramUser {
    id: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    isLoaded: boolean;
}

export function useTelegramUser() {
    const [user, setUser] = useState<TelegramUser>({
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        isLoaded: false
    });

    useEffect(() => {
        const webApp = window.Telegram?.WebApp;
        
        if (webApp) {
            // Ensure the WebApp is ready
            //webApp.ready();
            
            const tgUser = webApp.initDataUnsafe?.user;
            if (tgUser) {
                setUser({
                    id: tgUser.id,
                    username: tgUser.username || null,
                    firstName: tgUser.first_name || null,
                    lastName: tgUser.last_name || null,
                    isLoaded: true
                });
            }
        }
    }, []);

    return user;
}