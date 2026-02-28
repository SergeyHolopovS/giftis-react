import { WishDto } from "@/lib/types/wishes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllWishesRequest(id: string | null) {
	const response = await axios.get<unknown[]>(`/v1/wish/user/${id}`);
	return response.data.map((el) => WishDto.parse(el));
}

export default function useAllWishes(id: string | null) {
	return useQuery({
		queryKey: ["getAllWishesRequest", id],
		queryFn: () => getAllWishesRequest(id),
	});
}
