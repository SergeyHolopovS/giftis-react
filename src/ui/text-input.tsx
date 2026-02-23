import { forwardRef, type InputHTMLAttributes } from "react";

const TextInput = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return (
		<input
			ref={ref}
			type="text"
			placeholder="Заголовок"
			className="w-full rounded-lg px-4 py-2 outline-1 outline-gray-400 bg-gray-300 text-lg text-gray-600"
			{...props}
		/>
	);
});

export default TextInput;
