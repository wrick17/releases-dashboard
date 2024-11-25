import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 2000,
	},
	tools: {
		postcss: {
			plugins: {
				tailwindcss: {},
			},
		},
	},
	output: {
		assetPrefix: "/releases-dashboard/",
	},
	html: {
		favicon: "./src/assets/favicon.png",
	},
});
