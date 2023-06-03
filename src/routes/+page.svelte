<script>
	import { afterUpdate } from "svelte";
	import { base } from "$app/paths";
	import Footer from "$lib/Footer.svelte";
	import List from "$lib/List.svelte";
	import { invalidateAll } from "$app/navigation";

	export let data;

	// reactive assignment from loaded data to make sure it is updated when we invalidate
	$: listObjects = data.lists.reverse();

	let editMode = false;
</script>

<main class="flex flex-col items-center">
	<div class="flex w-full flex-row items-center justify-center">
		<h1 class="w-fit p-4 text-3xl font-semibold">My shopping lists</h1>
		<button
    class:shadow-inner;shadow-black={editMode}
			on:click={() => (editMode = !editMode)}
			class="i-mdi-dots-vertical?bg absolute right-4 text-3xl" />
	</div>
	<hr class="w-full border-black" />
	<div class="grid grid-cols-2">
		{#each Object.values(listObjects) as list (list._id)}
			<List
				{list}
				{editMode}
				on:deletedList={async () => {
					await invalidateAll();
				}} />
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
