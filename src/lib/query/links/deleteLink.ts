import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function deleteLinkRequest(id: string) {
	return await axios.delete(`/v1/links/${id}`);
}

export default function useDeleteLink() {
	return useMutation({
		mutationKey: ["deleteLinkRequest"],
		mutationFn: (id: string) => deleteLinkRequest(id),
	});
}
