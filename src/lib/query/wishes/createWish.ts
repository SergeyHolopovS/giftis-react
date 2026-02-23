import type { CreateWish } from "@/lib/types/wishes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createWishRequest(data: CreateWish) {
	return await axios.post("/v1/wish", data);
}

export default function useCreateWish() {
	return useMutation({
		mutationKey: ["createWishRequest"],
		mutationFn: (data: CreateWish) => createWishRequest(data),
	});
}
