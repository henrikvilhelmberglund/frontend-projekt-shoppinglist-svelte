<script>
	import { createEventDispatcher } from "svelte";
	import BackButton from "./BackButton.svelte";
	import { addNewListItem, deleteListItem, updateCheckedState, updateListTitle } from "./api";

	export let list;

	// console.table(list);
	let { listname, color, _id } = list;
	// since itemList is a property in an object we need to make it a reactive assignment instead to trigger reactivity
	$: itemList = list.itemList;
	const dispatch = createEventDispatcher();
	let editMode = false;
	let itemTitle = "";
	let newItemInput;
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
				{#if !editMode}
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
				{:else if editMode}
					<button
						on:click={async () => {
							await deleteListItem(_id, itemID);
							dispatch("deletedItem");
						}}
						class="i-mdi-delete text-2xl" />
				{/if}
				<p class="peer-checked:line-through">
					{title}
				</p>
			</div>
		{/each}
		{#if editMode}
			<div class="flex flex-col justify-between">
				<div>
					<input
						class="m-6 mr-0 mt-20 border-2 border-l-0 border-r-0 border-t-0 border-black p-0 pl-1"
						bind:value={itemTitle}
						bind:this={newItemInput}
						on:keydown={async (e) => {
							if (e.code === "Enter") {
								await addNewListItem(_id, itemTitle);
								dispatch("newItem");
								// addItem(itemTitle);
								itemTitle = "";
								newItemInput.focus();
							}
						}}
						placeholder="Add an item..." />
					<button
						on:click={async () => {
							await addNewListItem(_id, itemTitle);
							dispatch("newItem");
							// addItem(itemTitle);
							itemTitle = "";
							newItemInput.focus();
						}}
						class="i-mdi-plus text-lg" />
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
</style>
