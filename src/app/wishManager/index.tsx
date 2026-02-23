import useMyWishes from "@/lib/query/wishes/getMyWishes";
import {
	useForm,
	type SubmitErrorHandler,
	type SubmitHandler,
} from "react-hook-form";
import Slide from "../slide";
import type { CreateWish } from "@/lib/types/wishes";
import { toast } from "react-toastify";
import { doIfAxiosError } from "@/lib/types/queries";
import { useQueryClient } from "@tanstack/react-query";
import useCreateWish from "@/lib/query/wishes/createWish";
import Wish from "@/ui/wish";
import Spinner from "@/ui/spinner";
import useDeleteWish from "@/lib/query/wishes/deleteWish";
import TextInput from "@/ui/text-input";

export default function WishManager() {
	const { register, handleSubmit } = useForm<CreateWish>({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});
	const client = useQueryClient();
	const { mutateAsync: deleteWish } = useDeleteWish();
	const { data: response } = useMyWishes();
	const { mutateAsync } = useCreateWish();

	const clearVal = (value: string | undefined) =>
		value !== "" ? value : undefined;

	const onSubmit: SubmitHandler<CreateWish> = async (data) => {
		const payload: CreateWish = {
			title: data.title,
			link: clearVal(data.link),
			note: clearVal(data.note),
		};
		try {
			await mutateAsync(payload);
			client.refetchQueries({
				queryKey: ["getMyWishesRequest"],
			});
			toast.success("Хотелка успешно создана");
		} catch (exception) {
			doIfAxiosError(exception, (error) => toast.error(error?.message));
		}
	};

	const onError: SubmitErrorHandler<CreateWish> = (errors) => {
		Object.values(errors).forEach((error) => {
			if (error?.message) {
				toast.error(error.message);
			}
		});
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteWish(id);
			client.refetchQueries({
				queryKey: ["getMyWishesRequest"],
			});
			toast.success("Хотелка успешно удалена");
		} catch (exception) {
			doIfAxiosError(exception, (error) => toast.error(error?.message));
		}
	};

	return (
		<Slide title="Мои хотелки">
			<div className="flex gap-2 flex-col p-2 overflow-y-auto box-border max-h-full">
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="w-full p-2 rounded-md border border-gray-300 flex flex-col gap-2"
				>
					<h2 className="text-center w-full text-lg text-gray-500">
						Новая связь
					</h2>
                    <TextInput
						placeholder="Заголовок"
						{...register("title", {
							required: "Поле заголовка обязательно",
						})}
                    />
                    <TextInput
						placeholder="Заметка"
						{...register("note")}
                    />
                    <TextInput
						placeholder="Ссылка"
						{...register("link")}
                    />
					<button
						type="submit"
						className="w-full py-1 text-lg text-white rounded-sm cursor-pointer hover:scale-102 duration-200 bg-gray-400"
					>
						Создать
					</button>
				</form>
				{response !== undefined ? (
					response.data.map((el) => (
						<Wish
							key={el.id}
							canDelete
							onDelete={() => handleDelete(el.id)}
							{...el}
						/>
					))
				) : (
					<div className="w-full justify-center p-2">
						<Spinner />
					</div>
				)}
			</div>
		</Slide>
	);
}
