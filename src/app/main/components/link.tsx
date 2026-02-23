import type { LinkDto } from "@/lib/types/links";
import parseLinkType from "@/lib/utils/links";
import { useStage } from "@/store/stage";
import { useUser } from "@/store/user";

export default function Link({ link }: { link: LinkDto }) {
	const changeStage = useStage((state) => state.changeStage);
	const changeUser = useUser((state) => state.changeUser);
	return (
		<button
			type="button"
			onClick={() => {
				changeUser(link.user.id)
				changeStage("wishlist");
			}}
			className="w-full h-15 shrink-0 rounded-md bg-gray-200 p-2 flex items-center justify-between gap-4 cursor-pointer"
		>
			<div className="flex h-full items-center gap-2 max-w-2/3">
				<div className="aspect-square h-full rounded-full flex items-center justify-center bg-gray-400">
					<h3 className="text-white text-xl">{link.user.name.charAt(0)}</h3>
				</div>
				<h5 className="text-lg text-gray-400 max-w-[calc(100%-48px)] text-ellipsis overflow-hidden whitespace-nowrap tracking-tighter">
					{link.user.name}
				</h5>
			</div>
			<h4 className="text-lg text-gray-400">{parseLinkType(link.type)}</h4>
		</button>
	);
}
