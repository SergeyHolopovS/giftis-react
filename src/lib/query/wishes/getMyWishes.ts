import { WishDto } from "@/lib/types/wishes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getMyWishesRequest() {
	const response = await axios.get<unknown[]>(`/v1/wish`);
	return response.data.map((el) => WishDto.parse(el));
}

export default function useMyWishes() {
	return useQuery({
		queryKey: ["getMyWishesRequest"],
		queryFn: getMyWishesRequest,
	});
}
