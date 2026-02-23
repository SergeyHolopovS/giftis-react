import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Stage = "wishlist" | "links" | "manageLinks" | "myWishes";

interface Store {
	stage: Stage;
	changeStage: (newStage: Stage) => void;
}

export const useStage = create<Store>()(
	persist(
		(set) => ({
			stage: "links",

			changeStage: (newStage) =>
				set(() => ({
					stage: newStage,
				})),
		}),
		{
			name: "stage-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
