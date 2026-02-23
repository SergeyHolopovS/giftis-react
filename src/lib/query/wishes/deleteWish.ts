import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function deleteWishRequest(id: string) {
	return await axios.delete(`/v1/wish/${id}`);
}

export default function useDeleteWish() {
	return useMutation({
		mutationKey: ["deleteWishRequest"],
		mutationFn: (id: string) => deleteWishRequest(id),
	});
}
