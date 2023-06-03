<script>
	import { afterUpdate } from "svelte";
	import { base } from "$app/paths";
	import Footer from "$lib/Footer.svelte";
	import List from "$lib/List.svelte";

	export let data;

	const listObjects = data.lists;
</script>

<main class="flex flex-col items-center">
	<h1 class="p-4 text-3xl font-semibold">My shopping lists</h1>
	<hr class="w-full border-black" />
	<div class="grid grid-cols-2">
		{#each Object.values(listObjects) as list}
			<List {list} />
		{/each}
	</div>
	<a
		href="/create-list"
		class="i-mdi-plus?bg mt-4 cursor-pointer rounded-full bg-[hsl(214,32%,89%)] text-5xl shadow-md shadow-black/50 hover:bg-slate-200">
		<p class="text-transparent">Create list</p>
	</a>
</main>

<Footer />

<style>
</style>
