import type { ReactNode } from "react";
import useTelegram from "./telegram";

export default function TelegramProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { isReady, isTelegram, user } = useTelegram();

    if (!isTelegram || !isReady || user === undefined) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="flex flex-col max-w-100 w-full justify-between items-center p-2 text-black">
                    <h1 className="font-bold text-2xl">Упс! 🌐</h1>
                    <p className="text-center">
                        Это приложение работает только внутри Telegram.
                    </p>
                </div>
            </div>
        );
    }

    if (user.username === undefined || user.username === null) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="flex flex-col max-w-100 w-full justify-between items-center p-2 text-black">
                    <h1 className="font-bold text-2xl">Упс! 🌐</h1>
                    <p className="text-center">
                        Имя пользователя не задано или скрыто
                        <br />
                        Пожалуйста укажите имя пользователя в настройках
                        <br />
                        или разрешите боту его видеть
                    </p>
                </div>
            </div>
        );
    }

    return children;
}