import type { LinkType } from "@/lib/types/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createLinkRequest(userId: string, type: LinkType) {
	return await axios.post("/v1/links", {
		userId,
		type,
	});
}

export default function useCreateLink() {
	return useMutation({
		mutationKey: ["createLinkRequest"],
		mutationFn: ({ userId, type }: { userId: string; type: LinkType }) =>
			createLinkRequest(userId, type),
	});
}
