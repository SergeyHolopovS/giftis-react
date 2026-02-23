import useAllLinks from "@/lib/query/links/getAllLinks";
import Slide from "../slide";
import Link from "./components/link";
import {
	Controller,
	useForm,
	type SubmitErrorHandler,
	type SubmitHandler,
} from "react-hook-form";
import useCreateLink from "@/lib/query/links/createLink";
import type { CreateLink } from "@/lib/types/links";
import { doIfAxiosError } from "@/lib/types/queries";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import parseLinkType, { linkTypes } from "@/lib/utils/links";
import clsx from "clsx";
import Spinner from "../../ui/spinner";
import TextInput from "@/ui/text-input";

export default function LinksManager() {
	const { data: response } = useAllLinks();
	const { mutateAsync } = useCreateLink();
	const { register, handleSubmit, control, setValue } = useForm<CreateLink>({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		defaultValues: {
			userId: "",
			type: "FRIEND",
		},
	});
	const client = useQueryClient();

	const onSubmit: SubmitHandler<CreateLink> = async (data) => {
		if (data.userId === "") {
			toast.error(data.userId);
			toast.error("Необходимо ввести id пользователя");
			return;
		}
		try {
			await mutateAsync(data);
			setValue("userId", "");
			client.refetchQueries({
				queryKey: ["getAllLinksRequest"],
			});
			toast.success("Связь успешно создана");
		} catch (exception) {
			doIfAxiosError(exception, (error) => toast.error(error?.message));
		}
	};

	const onError: SubmitErrorHandler<CreateLink> = (errors) => {
		Object.values(errors).forEach((error) => {
			if (error?.message) {
				toast.error(error.message);
			}
		});
	};

	return (
		<Slide title="Мои связи">
			<div className="size-full overflow-y-auto box-border flex flex-col gap-2 p-2">
				<div className="w-full p-2 flex flex-col gap-4 rounded-md items-center bg-gray-200 border border-gray-300">
					<h2 className="text-gray-500 text-lg font-bold">Мой код</h2>
					{/* <h1 className="text-gray-600 text-xl">{window.Telegram.WebApp.initDataUnsafe.user?.id}</h1> */}
					<h1 className="text-gray-600 text-xl font-extrabold">1</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="w-full p-2 rounded-md border border-gray-300 flex flex-col gap-2"
				>
					<h2 className="text-center w-full text-lg text-gray-500">
						Новая связь
					</h2>
					<TextInput
						placeholder="Код"
						{...register("userId", {
							required: "Поле обязательно",
						})}
						onInput={(e) =>
							(e.currentTarget.value = e.currentTarget.value.replace(
								/[^0-9]/g,
								"",
							))
						}
					/>
					<Controller
						control={control}
						name="type"
						defaultValue="FRIEND"
						render={({ field }) => (
							<div className="w-full h-10 flex gap-2">
								{linkTypes.map((el, index) => (
									<button
										key={index}
										type="button"
										onClick={() => field.onChange(el)}
										className={clsx(
											"size-full rounded-lg cursor-pointer hover:scale-110 duration-200 px-2 text-sm",
											el === field.value
												? "bg-gray-400 text-white"
												: "bg-gray-300 text-gray-500",
										)}
									>
										{parseLinkType(el)}
									</button>
								))}
							</div>
						)}
					/>
					<button
						type="submit"
						className="w-full py-1 text-lg text-white rounded-sm cursor-pointer hover:scale-105 duration-200 bg-gray-400"
					>
						Создать
					</button>
				</form>
				{response !== undefined ? (
					response.data
						.sort((el1, el2) => el1.id.localeCompare(el2.id))
						.map((el) => <Link key={el.id} {...el} />)
				) : (
					<div className="w-full p-2 flex justify-center">
						<Spinner />
					</div>
				)}
			</div>
		</Slide>
	);
}
