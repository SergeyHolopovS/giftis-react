import type { UserDto } from "./user";

export interface WishDto {
    id: string;
    user: UserDto;
    title: string;
    note?: string;
    link?: string;
}

export interface CreateWish {
    title: string;
    note?: string;
    link?: string;
}