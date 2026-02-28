import { UserDto } from "./user";
import { z } from "zod";

export const LinkType = z.enum([
	"FRIEND",
	"RELATIONSHIP",
	"FAMILY",
	"BEST_FRIENDS",
]);

export type LinkType = z.infer<typeof LinkType>;

export const LinkDto = z.object({
	id: z.string(),
	user: UserDto,
	type: LinkType,
});

export type LinkDto = z.infer<typeof LinkDto>;

export const CreateLink = z.object({
	userId: z.string(),
	type: LinkType,
});

export type CreateLink = z.infer<typeof CreateLink>;
