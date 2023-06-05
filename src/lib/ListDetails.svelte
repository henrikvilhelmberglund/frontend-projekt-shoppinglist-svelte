<script>
	import BackButton from "./BackButton.svelte";
	import {
		addNewListItem,
		deleteListItem,
		getListUsingID,
		updateCheckedState,
		updateColor,
		updateListTitle,
	} from "./api";

	export let list;
  export let username;

	// console.table(list);
	let { listname, color: activeColor, _id } = list;
	let colors = ["default", "red", "orange", "yellow", "green", "blue", "purple"];
	let selectedColor;
	// since itemList is a property in an object we need to make it a reactive assignment instead to trigger reactivity
	$: itemList = list.itemList;
	let editMode = false;
	let itemTitle = "";
	let newItemInput;
</script>

<div
	class:bg-red-400={activeColor === "red"}
	class:bg-orange-400={activeColor === "orange"}
	class:bg-yellow-400={activeColor === "yellow"}
	class:bg-green-400={activeColor === "green"}
	class:bg-blue-400={activeColor === "blue"}
	class:bg-purple-400={activeColor === "purple"}
	class="flex items-center justify-between shadow shadow-black">
	<BackButton {username} />
	{#if !editMode}
		<h1 class="p-6 text-3xl font-bold">{listname}</h1>
	{:else if editMode}
		<input
			class:bg-red-400={activeColor === "red"}
			class:bg-orange-400={activeColor === "orange"}
			class:bg-yellow-400={activeColor === "yellow"}
			class:bg-green-400={activeColor === "green"}
			class:bg-blue-400={activeColor === "blue"}
			class:bg-purple-400={activeColor === "purple"}
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
							await updateCheckedState(username, _id, itemID, newCheckedValue);
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
							list = await getListUsingID(_id);
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
								list = await getListUsingID(_id);
								// addItem(itemTitle);
								itemTitle = "";
								newItemInput.focus();
							}
						}}
						placeholder="Add an item..." />
					<button
						on:click={async () => {
							await addNewListItem(_id, itemTitle);
							list = await getListUsingID(_id);
							// addItem(itemTitle);
							itemTitle = "";
							newItemInput.focus();
						}}
						class="i-mdi-plus text-lg" />
				</div>
			</div>
		{/if}
	{/if}
	{#if editMode}
		<div class="absolute bottom-0 flex w-full flex-col bg-slate-300 p-4 text-center font-semibold">
			<p class="text-lg">Choose a color for your list:</p>
			<div class="flex items-center justify-center gap-4">
				<!-- obvious would be color here but I'm already using that -->
				{#each colors as color}
					<input
						class:!bg-slate-500={color === "default"}
						class:!bg-red-500={color === "red"}
						class:!bg-orange-500={color === "orange"}
						class:!bg-yellow-500={color === "yellow"}
						class:!bg-green-500={color === "green"}
						class:!bg-blue-500={color === "blue"}
						class:!bg-purple-500={color === "purple"}
						class="checked:border-1 focus:border-1 my-4 h-8 w-8 cursor-pointer border-0 !ring-black checked:border-solid checked:border-black focus:!border-solid focus:!border-black focus:ring-0 focus:ring-offset-1"
						type="radio"
						name="color"
						value={color}
						bind:group={selectedColor}
						on:change={async () => {
							activeColor = await updateColor(selectedColor, _id);
						}} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Tailwind forms being silly */
	[type="radio"]:checked {
		background-image: none;
	}
</style>
