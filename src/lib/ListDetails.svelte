<script>
	import { updateCheckedState } from "./api";

	export let list;

	// console.table(list);
	const { listname, itemList, color, _id } = list;

</script>

<div
	class:bg-red-400={color === "red"}
	class:bg-purple-400={color === "purple"}
	class="flex justify-between shadow shadow-black">
	<a href="/" class="i-mdi-arrow-left-drop-circle-outline ml-4 text-4xl h-auto">Go back</a>
	<h1 class="p-6 text-3xl font-bold">{listname}</h1>
	<div />
</div>

<div class="p-6 pt-16">
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
</div>

<style>
</style>
