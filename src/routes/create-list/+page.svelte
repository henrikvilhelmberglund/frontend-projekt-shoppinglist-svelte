<script>
	import BackButton from "$lib/BackButton.svelte";

	let colors = ["default", "red", "orange", "yellow", "green", "blue", "purple"];
	let selectedColor = "default";
	let listTitle = "New list";
	let itemTitle = "";
	let newItemInput;
	let items = [];

	function addItem(itemTitle) {
		items = [...items, itemTitle];
	}

	async function saveList() {
		const res = await fetch(`/api/lists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				listname: listTitle,
				customfield: "grupp_e",
				color: selectedColor,
			}),
		});
		const { list } = await res.json();
		console.log(list);
		let currentList = list._id;
		console.log(currentList);

		await saveItems(currentList);
		return list;
	}

	async function saveItems(currentList) {
		itemListArray.forEach(async (object) => {
			const title = object.title;
			const checked = object.checked;
			const res = await fetch(`/api/lists/${currentList}/items`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					checked: checked,
				}),
			});

			const { list } = await res.json();
			console.log(list);
		});
	}
</script>

<div
	class:bg-red-500={selectedColor === "red"}
	class:bg-orange-500={selectedColor === "orange"}
	class:bg-yellow-500={selectedColor === "yellow"}
	class:bg-green-500={selectedColor === "green"}
	class:bg-blue-500={selectedColor === "blue"}
	class:bg-purple-500={selectedColor === "purple"}
	class="flex items-center justify-between shadow shadow-black">
	<BackButton />
	<input
		type="text"
		class="!m-0 h-fit w-fit rounded border-0 !p-0 text-center text-3xl font-bold focus:ring-2 focus:ring-black"
		on:focus={(e) => e.target.setSelectionRange(0, e.target.value.length)}
		bind:value={listTitle} />
	<div />
</div>

<div class="flex flex-col justify-between">
	<div>
		<input
			class="m-6 mr-0 mt-20 border-2 border-l-0 border-r-0 border-t-0 border-black p-0 pl-1"
			bind:value={itemTitle}
			bind:this={newItemInput}
			on:keydown={(e) => {
				if (e.code === "Enter") {
					addItem(itemTitle);
					itemTitle = "";
					newItemInput.focus();
				}
			}}
			placeholder="Add an item..." />
		<button
			on:click={() => {
				addItem(itemTitle);
				itemTitle = "";
				newItemInput.focus();
			}}
			class="i-mdi-plus text-lg" />
	</div>

	<div>
		<ul class="mt-2">
			{#each items as item}
				<li class="mx-4 my-1 pl-4">
					<div class="i-mdi-delete text-2xl" />
					<span class="pl-2">
						{item}
					</span>
				</li>
			{/each}
		</ul>
		{#if items.length > 0}
			<button
				on:click={async () => await saveList()}
				class="my-4 ml-5 rounded-xl bg-green-400 p-px px-2 hover:bg-green-500">
				Save list</button>
		{/if}
	</div>

	<div class="absolute bottom-0 flex w-full flex-col bg-slate-300 p-4 text-center font-semibold">
		<p class="text-lg">Choose a color for your list:</p>
		<div class="flex items-center justify-center gap-4">
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
					bind:group={selectedColor} />
			{/each}
		</div>
	</div>
</div>

<style>
	/* Tailwind forms being silly */
	[type="radio"]:checked {
		background-image: none;
	}
</style>
