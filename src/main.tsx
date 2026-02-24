import { createRoot } from "react-dom/client";
import { Bounce, ToastContainer } from "react-toastify";
import "./index.css";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app";
import type { IRequestError } from "./lib/types/queries";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;

const refreshFn = (failureCount: number, error: Error) => {
	if (
		axios.isAxiosError<IRequestError>(error) &&
		error.response !== undefined &&
		error.response.status === 401
	) {
		if (failureCount === 3) {
			axios.post("/v1/auth", {
				// initData: window.Telegram.WebApp.initData
				initData: "1",
			});
			return true;
		}
		try {
			axios.post("/v1/auth/refresh");
		} catch {
			/* Пропускаем */
		}
		return failureCount !== 3;
	}
	return false;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retryDelay: 1000,
			retry: refreshFn,
		},
		mutations: {
			retryDelay: 1000,
			retry: refreshFn,
		},
	},
});

// biome-ignore lint/style/noNonNullAssertion: <React init code>
createRoot(document.getElementById("root")!).render(
	<>
		{/* <TelegramProvider> */}
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="light"
				transition={Bounce}
			/>
		{/* </TelegramProvider> */}
	</>,
);
