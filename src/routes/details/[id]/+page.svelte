<script>
	import ListDetails from "$lib/ListDetails.svelte";
	import { invalidateAll } from "$app/navigation";

	export let data;

	$: list = data.list;
</script>

<ListDetails
	{list}
	on:newItem={async () => {
		await invalidateAll();
	}}
	on:deletedItem={async () => {
		await invalidateAll();
	}} />

<style>
</style>
