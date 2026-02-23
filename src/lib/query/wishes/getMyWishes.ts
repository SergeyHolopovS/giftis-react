import type { WishDto } from "@/lib/types/wishes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getMyWishesRequest() {
	return await axios.get<WishDto[]>(`/v1/wish`);
}

export default function useMyWishes() {
	return useQuery({
		queryKey: ["getMyWishesRequest"],
		queryFn: getMyWishesRequest,
	});
}
