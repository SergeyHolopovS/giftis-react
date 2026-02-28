import { UserDto } from "./user";
import { z } from 'zod'

export const WishDto = z.object({
	id: z.uuid(),
	user: UserDto,
	title: z.string(),
	note: z.string().nullable(),
	link: z.string().nullable(),
})

export type WishDto = z.infer<typeof WishDto>

export const CreateWish = z.object({
	title: z.string(),
	note: z.string().optional(),
	link: z.string().optional(),
})

export type CreateWish = z.infer<typeof CreateWish>