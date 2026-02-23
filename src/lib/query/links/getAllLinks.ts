import type { LinkDto } from "@/lib/types/links";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllLinksRequest() {
	return await axios.get<LinkDto[]>("/v1/links");
}

export default function useAllLinks() {
	return useQuery({
		queryKey: ["getAllLinksRequest"],
		queryFn: getAllLinksRequest,
	});
}
