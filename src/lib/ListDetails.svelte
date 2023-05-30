<script>
	export let list;

	// console.table(list);
	const { listname, itemList, color, _id } = list;

	async function updateChecked(id, checked) {
		console.log(id);
		const res = await fetch(`/api/list/${id}`, {
			method: "PUT",
			body: JSON.stringify({ id, checked }),
			headers: { "content-type": "application/json" },
		});
		const data = await res.json();
	}
</script>

<div
	class:bg-red-400;!hover-bg-red-500={color === "red"}
	class:bg-purple-400;!hover-bg-purple-500={color === "purple"}
	class="flex justify-center shadow shadow-black">
	<h1 class="p-6 text-3xl font-bold">{listname}</h1>
</div>

<div class="p-6 pt-16">
	{#each itemList as { _id: itemID, title, checked }}
		{itemID}
		<div class="flex flex-row items-center gap-3 pl-2 pt-2">
			<input
				on:change={async () => {
					checked = !checked;
					await updateChecked(itemID, checked);
				}}
				class="peer block h-6 w-6 rounded-full text-slate-500 checked:h-6 checked:w-6 checked:bg-slate-500"
				type="checkbox"
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
