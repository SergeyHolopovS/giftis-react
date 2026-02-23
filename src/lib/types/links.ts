import type { UserDto } from "./user";

export type LinkType = "FRIEND" | "RELATIONSHIP" | "FAMILY" | "BEST_FRIENDS";

export interface LinkDto {
	id: string;
	user: UserDto;
	type: LinkType;
}

export interface CreateLink {
	userId: string;
	type: LinkType;
}
