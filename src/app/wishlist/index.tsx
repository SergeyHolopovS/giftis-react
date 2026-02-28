import useAllWishes from "@/lib/query/wishes/getAllWishes";
import { useUser } from "@/store/user";
import Slide from "../slide";
import Spinner from "../../ui/spinner";
import { useStage } from "@/store/stage";
import Wish from "@/ui/wish";

export default function WishList() {
	const user = useUser((state) => state.user);
	const changeStage = useStage((state) => state.changeStage);
	const { data: response } = useAllWishes(user);
	if (response === undefined)
		return (
			<div className="size-full flex items-center justify-center">
				<Spinner />
			</div>
		);
	if (response.length === 0)
		return (
			<div className="size-full flex items-center justify-center">
				Пока пусто...
			</div>
		);
	return (
		<Slide title={response[0].user.name}>
			<div className="flex flex-col p-2 gap-2 overflow-y-auto box-border size-full max-h-full">
				<button
					type="button"
					onClick={() => changeStage("links")}
					className="w-full h-10 rounded-lg bg-gray-500 text-white shrink-0"
				>
					Назад
				</button>
				{response.map((el) => (
					<Wish key={el.id} {...el} />
				))}
			</div>
		</Slide>
	);
}
