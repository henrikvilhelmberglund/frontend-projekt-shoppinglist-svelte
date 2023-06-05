<script>
	import { createEventDispatcher } from "svelte";
	import { API_BASE } from "./api";
	const dispatch = createEventDispatcher();

	export let list;
	export let editMode = false;

	// console.log(list);
	const { listname, itemList, color, _id } = list;

	// funktion som tar bort lista med ett speciellt ID
	// ta inte bort fel 😄
	export async function deleteListUsingID(id) {
		if (id === null) {
			console.log(id, "wrong");
			return;
		}
		const res = await fetch(`${API_BASE}/lists/${id}`, {
			method: "DELETE",
		});
		dispatch("deletedList");
	}
</script>

<a
	class:bg-red-400;!hover-bg-red-500={color === "red"}
	class:bg-orange-400;!hover-bg-orange-500={color === "orange"}
	class:bg-yellow-400;!hover-bg-yellow-500={color === "yellow"}
	class:bg-green-400;!hover-bg-green-500={color === "green"}
	class:bg-blue-400;!hover-bg-blue-500={color === "blue"}
	class:bg-purple-400;!hover-bg-purple-500={color === "purple"}
	class="m-4 flex h-64 w-64 cursor-pointer flex-col items-center rounded bg-slate-300 shadow shadow-black/50 hover:bg-slate-200"
	href="/details/{_id}">
	<h2 class="pt-4 text-2xl font-bold">{listname}</h2>
	{#if editMode}
		<div class="absolute h-64 w-64">
			<button
				on:click|preventDefault={async () => await deleteListUsingID(_id)}
				class="i-mdi-delete?bg absolute right--3 top--2 rounded-full bg-slate-400 text-3xl" />
		</div>
	{/if}
	<div class="flex flex-col items-center pt-8">
		{#if itemList}
			{#each itemList as { itemID: _id, title, checked }, i}
				{#if i < 6}
					<p class:line-through={checked}>
						{title}
					</p>
				{/if}
				{#if i === 7}
					<p>...</p>
				{/if}
			{/each}
		{/if}
	</div>
</a>

<style>
</style>
