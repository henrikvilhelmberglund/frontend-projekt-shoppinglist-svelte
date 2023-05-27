<script>
	import { afterUpdate } from "svelte";
	import { base } from "$app/paths";
	import Footer from "$lib/Footer.svelte";
	import List from "$lib/List.svelte";

	export let data;

	const listObjects = data.lists;
</script>

<main class="flex flex-col items-center">
	<h1 class="p-4 text-3xl">My shopping lists</h1>
	<div class="grid grid-cols-2">
		{#each Object.values(listObjects) as list}
			<List {list} />
		{/each}
	</div>
</main>

<Footer />

<style>
</style>
