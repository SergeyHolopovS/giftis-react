import type { WishDto } from "@/lib/types/wishes";
import { MdDelete } from "react-icons/md";

interface IProps extends WishDto {
	canDelete?: boolean;
	onDelete?: (id: string) => void;
}

export default function Wish({
	canDelete = false,
	onDelete = () => {},
	...wish
}: IProps) {
	return (
		<div className="w-full p-2 flex flex-col rounded-md bg-gray-300 shrink-0">
			<div className="flex w-full justify-between items-center">
				<h3 className="text-lg text-gray-600">{wish.title}</h3>
				{canDelete && (
					<button
						type="button"
						onClick={() => onDelete(wish.id)}
						className="size-8 flex text-gray-500 hover:scale-105 duration-200 items-center justify-center"
					>
						<MdDelete size={32} />
					</button>
				)}
			</div>
			{(wish.link != null || wish.note != null) && (
				<div className="w-full h-px bg-white text-transparent select-none">
					...
				</div>
			)}
			{wish.note != null && (
				<div className="flex flex-col gap-1">
					<h5 className="text-md text-gray-600">Заметка</h5>
					<p className="text-sm text-gray-600">{wish.note}</p>
				</div>
			)}
			{wish.link != null && (
				<div className="flex flex-col gap-1">
					<h5 className="text-md text-gray-600">Ссылка</h5>
					<a href={`https://${wish.link}`} className="text-sm text-gray-600">
						{wish.link}
					</a>
				</div>
			)}
		</div>
	);
}
