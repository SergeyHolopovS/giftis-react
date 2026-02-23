import type { WishDto } from "@/lib/types/wishes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllWishesRequest(id: string | null) {
	return await axios.get<WishDto[]>(`/v1/wish/user/${id}`);
}

export default function useAllWishes(id: string | null) {
	return useQuery({
		queryKey: ["getAllWishesRequest", id],
		queryFn: () => getAllWishesRequest(id),
	});
}
