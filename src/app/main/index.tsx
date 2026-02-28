import useAllLinks from "@/lib/query/links/getAllLinks";
import Slide from "../slide";
import Link from "./components/link";
import Spinner from "@/ui/spinner";

export default function Main() {
	const { data: response } = useAllLinks();

	return (
		<Slide title="Главная">
			<div className="flex size-full flex-col p-2 gap-2 max-h-full overflow-y-auto box-border">
				{response !== undefined ? (
					response.map((el) => <Link key={el.id} link={el} />)
				) : (
					<div className="w-full flex items-center justify-center">
						<Spinner />
					</div>
				)}
			</div>
		</Slide>
	);
}
