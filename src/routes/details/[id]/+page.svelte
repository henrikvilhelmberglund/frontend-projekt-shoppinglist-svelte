<script>
	import ListDetails from "$lib/ListDetails.svelte";
	import { invalidateAll } from "$app/navigation";

	export let data;

	$: list = data.list;
</script>

<ListDetails
	{list}
	on:newItem={async () => {
		console.log("new item wow");
		await invalidateAll();
	}} />

<style>
</style>
