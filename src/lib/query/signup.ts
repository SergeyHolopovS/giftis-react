import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createUser(initData: string) {
	return await axios.post("/v1/user", { initData });
}

export default function useSignin() {
	return useMutation({
		mutationKey: ["createUser"],
		mutationFn: (initData: string) => createUser(initData),
	});
}
