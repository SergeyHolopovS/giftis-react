import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function authRequest(initData: string) {
	return await axios.post("/v1/auth", { initData });
}

export default function useAuth() {
	return useMutation({
		mutationKey: ["authRequest"],
		mutationFn: (initData: string) => authRequest(initData),
	});
}
