import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(config) {
					if (config.includes("node_modules")) {
						if (
							config.includes("react") ||
							config.includes("react-dom") ||
							config.includes("react-router-dom") ||
							config.includes("@tanstack/react-query") ||
							config.includes("axios")
						) {
							return "vendor"; // всё, что совпадает, пойдёт в один чанк vendor
						}
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	plugins: [
		tailwindcss(),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
});
