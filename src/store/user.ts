import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
	user: string | null;
	changeUser: (newUser: string | null) => void;
}

export const useUser = create<Store>()(
	persist(
		(set) => ({
			user: null,

			changeUser: (newUser) =>
				set(() => ({
					user: newUser,
				})),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
