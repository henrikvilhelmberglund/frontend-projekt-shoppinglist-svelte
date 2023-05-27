<script>
	export let list;

	console.log(list);
	const { listname, itemList, color } = list;
</script>

<div
	class:bg-red-400;!hover-bg-red-500={color === "red"}
	class:bg-purple-400;!hover-bg-purple-500={color === "purple"}
	class="m-4 flex h-64 w-64 flex-col items-center rounded bg-slate-300 hover:bg-slate-200">
	<h2 class="pt-4 text-2xl font-bold">{listname}</h2>
	<div class="flex flex-col items-center pt-8">
		{#each itemList as { itemID: _id, title, checked }}
			<p class:line-through={checked}>
				{title}
			</p>
		{/each}
	</div>
</div>

<style>
</style>
