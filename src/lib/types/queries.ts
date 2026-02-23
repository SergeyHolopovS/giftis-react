import axios from "axios";

export interface IRequestError {
	message: string;
	status: string;
}

export function doIfAxiosError(
	error: unknown,
	fun: (error?: IRequestError) => void,
) {
	if (axios.isAxiosError<IRequestError>(error)) fun(error.response?.data);
}
