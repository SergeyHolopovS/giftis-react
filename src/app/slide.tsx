import type { ReactNode } from "react";

export default function Slide({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<div className="size-full flex flex-col items-center shrink-0">
			<div className="h-15.75 w-full flex items-center justify-center">
				<h1 className="text-4xl font-bold text-black">{title}</h1>
			</div>
			<div className="h-px w-full bg-gray-400 text-transparent">...</div>
			<div className="w-full h-[calc(100%-52px)] relative">{children}</div>
		</div>
	);
}
