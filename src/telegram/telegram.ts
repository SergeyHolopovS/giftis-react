import { useEffect, useState } from "react";

export default function useTelegram() {
	const [isReady, setIsReady] = useState(false);
	const [isTelegram, setIsTelegram] = useState(false);

	useEffect(() => {
		const tg = window.Telegram?.WebApp;

		if (tg && tg.platform !== "unknown") {
			tg.ready();
			setIsReady(true);
			setIsTelegram(true);
		} else {
			setIsReady(true);
			setIsTelegram(false);
		}
	}, []);

	const onClose = () => {
		window.Telegram?.WebApp?.close();
	};

	return {
		tg: window.Telegram?.WebApp,
		isReady,
		isTelegram,
		user: window.Telegram?.WebApp?.initDataUnsafe?.user,
		onClose,
	};
}
