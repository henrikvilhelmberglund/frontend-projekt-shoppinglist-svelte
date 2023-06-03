<script>
	import { createEventDispatcher } from "svelte";

	export let list;
	export let editMode = false;

	// console.log(list);
	const { listname, itemList, color, _id } = list;
	const dispatch = createEventDispatcher();

	async function deleteList(id) {
		const res = await fetch(`/api/lists/${id}`, {
			method: "DELETE",
		});
		const { list } = await res.json();
		console.log("result:", list);
		dispatch("deletedList");
		return list;
	}
</script>

<a
	class:bg-red-400;!hover-bg-red-500={color === "red"}
	class:bg-purple-400;!hover-bg-purple-500={color === "purple"}
	class="m-4 flex h-64 w-64 cursor-pointer flex-col items-center rounded bg-slate-300 shadow shadow-black/50 hover:bg-slate-200"
	href="/details/{_id}">
	<h2 class="pt-4 text-2xl font-bold">{listname}</h2>
	{#if editMode}
		<div class="absolute h-64 w-64">
			<button
				on:click|preventDefault={async () => await deleteList(_id)}
				class="i-mdi-delete?bg absolute right--3 top--2 rounded-full bg-slate-400 text-3xl" />
		</div>
	{/if}
	<div class="flex flex-col items-center pt-8">
		{#if itemList}
			{#each itemList as { itemID: _id, title, checked }}
				<p class:line-through={checked}>
					{title}
				</p>
			{/each}
		{/if}
	</div>
</a>

<style>
</style>
