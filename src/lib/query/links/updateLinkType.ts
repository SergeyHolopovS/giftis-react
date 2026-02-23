import type { LinkType } from "@/lib/types/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function updateLinkTypeRequest(id: string, newType: LinkType) {
	return await axios.patch("/v1/links/type", {
		id,
		newType,
	});
}

export default function useUpdateLinkType() {
	return useMutation({
		mutationKey: ["updateLinkTypeRequest"],
		mutationFn: ({ id, type }: { id: string; type: LinkType }) =>
			updateLinkTypeRequest(id, type),
	});
}
