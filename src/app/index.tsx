import Main from "./main";
import { TiHome } from "react-icons/ti";
import { useStage, type Stage } from "@/store/stage";
import { FiLink } from "react-icons/fi";
import { FaGift } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import WishList from "./wishlist";
import LinksManager from "./linksManager/links-manager";
import WishManager from "./wishManager";

const stageIndexes: { [key: string]: number } = {
	wishlist: 0,
	links: -1,
	manageLinks: -2,
	myWishes: -3,
};

interface Link {
	stage: Stage;
	Icon: IconType;
}

const links: Link[] = [
	{
		stage: "links",
		Icon: TiHome,
	},
	{
		stage: "manageLinks",
		Icon: FiLink,
	},
	{
		stage: "myWishes",
		Icon: FaGift,
	},
];

export default function Home() {
	const stage = useStage((state) => state.stage);
	const changeStage = useStage((state) => state.changeStage);

	return (
		<div className="w-screen h-screen box-border overflow-hidden flex justify-center items-center">
			<div className="relative max-w-125 w-full h-screen box-border overflow-hidden">
				<div className="w-full h-[calc(100%-48px)] box-border overflow-hidden relative flex gap-0">
					{[WishList, Main, LinksManager, WishManager].map((Page, index) => (
						<div
							key={index}
							className="size-full absolute duration-300"
							style={{
								transform: `translateX(${(stageIndexes[stage] + index) * 100}%)`,
							}}
						>
							<Page />
						</div>
					))}
				</div>
				<div className="absolute z-10 w-full h-12 flex flex-col">
					<div className="w-full h-px bg-gray-400 text-transparent">...</div>
					<div className="w-full h-[calc(100%-1px)] flex justify-around items-center">
						{links.map((el, index) => (
							<button
								type="button"
								key={index}
								className="size-8 flex items-center justify-center cursor-pointer"
								onClick={() => changeStage(el.stage)}
							>
								<el.Icon className="text-gray-500" size={32} />
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
