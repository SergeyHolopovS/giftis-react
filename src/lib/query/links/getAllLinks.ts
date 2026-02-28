import { LinkDto } from "@/lib/types/links";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllLinksRequest() {
	const response = await axios.get<unknown[]>("/v1/links");
	return response.data.map((el) => LinkDto.parse(el));
}

export default function useAllLinks() {
	return useQuery({
		queryKey: ["getAllLinksRequest"],
		queryFn: getAllLinksRequest,
	});
}
