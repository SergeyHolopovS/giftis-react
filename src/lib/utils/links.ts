import type { LinkType } from "../types/links";

export default function parseLinkType(type: LinkType) {
	switch (type) {
		case "FRIEND":
			return "Друг";
		case "RELATIONSHIP":
			return "Отношения";
		case "FAMILY":
			return "Семья";
		case "BEST_FRIENDS":
			return "Л.Друг";
	}
}

export const linkTypes: LinkType[] = [
	"FAMILY",
	"FRIEND",
	"RELATIONSHIP",
	"BEST_FRIENDS",
];
