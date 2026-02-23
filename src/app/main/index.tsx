import useAllLinks from "@/lib/query/links/getAllLinks";
import Slide from "../slide";
import Link from "./components/link";

export default function Main() {
	const { data: response } = useAllLinks();

	return (
		<Slide title="Главная">
			<div className="flex size-full flex-col p-2 gap-2 max-h-full overflow-y-auto box-border">
				{response?.data.map((el) => (
					<Link key={el.id} link={el} />
				))}
			</div>
		</Slide>
	);
}
