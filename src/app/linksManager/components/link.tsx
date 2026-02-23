import type { LinkDto, LinkType } from "@/lib/types/links";
import { MdDelete } from "react-icons/md";
import parseLinkType, { linkTypes } from "@/lib/utils/links";
import useDeleteLink from "@/lib/query/links/deleteLink";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/store/user";
import { doIfAxiosError } from "@/lib/types/queries";
import { toast } from "react-toastify";
import clsx from "clsx";
import useUpdateLinkType from "@/lib/query/links/updateLinkType";

export default function Link(link: LinkDto) {
	const { mutateAsync: mutateDelete } = useDeleteLink();
	const { mutateAsync: mutateUpdateType } = useUpdateLinkType();
	const client = useQueryClient();
	const { user, changeUser } = useUser();

	async function handleDelete() {
		try {
			await mutateDelete(link.id);
			client.refetchQueries({
				queryKey: ["getAllLinksRequest"],
			});
			if (user === link.user.id) changeUser(null);
		} catch (exception) {
			doIfAxiosError(exception, (error) => toast.error(error?.message));
		}
	}

	async function handleUpdate(type: LinkType) {
		try {
			await mutateUpdateType({
				id: link.id,
				type,
			});
			client.refetchQueries({
				queryKey: ["getAllLinksRequest"],
			});
			if (user === link.user.id)
				client.refetchQueries({
					queryKey: ["getAllWishesRequest", link.user.id],
				});
		} catch (exception) {
			doIfAxiosError(exception, (error) => toast.error(error?.message));
		}
	}

	return (
		<div className="w-full p-2 rounded-md bg-gray-200 flex flex-col gap-2">
			<div className="flex justify-between w-full items-center">
				<h4 className="text-gray-500 text-lg pl-2 font-bold">
					{link.user.name}
				</h4>
				<button
					type="button"
					onClick={handleDelete}
					className="size-6 flex justify-center items-center hover:scale-110 duration-200 cursor-pointer text-gray-500"
				>
					<MdDelete size={24} />
				</button>
			</div>
			<div className="text-transparent h-px w-full bg-white select-none">
				...
			</div>
			<div className="w-full h-10 flex gap-2">
				{linkTypes.map((el, index) => (
					<button
						key={index}
						type="button"
						onClick={() => handleUpdate(el)}
						className={clsx(
							"size-full rounded-lg cursor-pointer hover:scale-110 duration-200 px-2 text-sm",
							link.type === el
								? "bg-gray-400 text-white"
								: "bg-gray-300 text-gray-500",
						)}
					>
						{parseLinkType(el)}
					</button>
				))}
			</div>
		</div>
	);
}
