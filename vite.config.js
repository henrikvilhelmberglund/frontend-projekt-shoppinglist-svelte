import { sveltekit } from "@sveltejs/kit/vite";
import { multicssclass } from "svelte-multicssclass";
import UnoCSS from "@unocss/svelte-scoped/vite";

import { defineConfig } from "vite";
export default defineConfig({
	plugins: [
		multicssclass(),
		UnoCSS({
			injectReset: "@unocss/reset/tailwind.css",
		}),
		sveltekit(),
	],
});
