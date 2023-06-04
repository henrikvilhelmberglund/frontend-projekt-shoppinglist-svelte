<script>
	import BackButton from "./BackButton.svelte";
	import { updateCheckedState, updateListTitle } from "./api";

	export let list;

	// console.table(list);
	let { listname, itemList, color, _id } = list;
	let editMode = false;
</script>

<div
	class:bg-red-400={color === "red"}
	class:bg-purple-400={color === "purple"}
	class="flex items-center justify-between shadow shadow-black">
	<BackButton />
	{#if !editMode}
		<h1 class="p-6 text-3xl font-bold">{listname}</h1>
	{:else if editMode}
		<input
			class:bg-red-400={color === "red"}
			class="my-6 px-6 text-center text-3xl font-bold"
			value={listname}
			on:focusout={async (e) => {
				await updateListTitle(e.target.value, list._id);
				listname = e.target.value;
			}} />
	{/if}
	<div />
	<button
		class:shadow-inner;shadow-black={editMode}
		on:click={() => (editMode = !editMode)}
		class="i-mdi-dots-vertical?bg absolute right-4 text-3xl" />
</div>

<div class="p-6 pt-16">
	{#if itemList}
		{#each itemList as { _id: itemID, title, checked }}
			<div class="flex flex-row items-center gap-3 pl-2 pt-2">
				<input
					on:change={async () => {
						let newCheckedValue = !checked;
						console.log(_id, itemID, newCheckedValue);
						await updateCheckedState(_id, itemID, newCheckedValue);
					}}
					class="peer block h-6 w-6 rounded-full text-slate-500 checked:h-6 checked:w-6 checked:bg-slate-500"
					type="checkbox"
					{checked}
					name={title}
					id="" />
				<p class="peer-checked:line-through">
					{title}
				</p>
			</div>
		{/each}
	{/if}
</div>

<style>
</style>
