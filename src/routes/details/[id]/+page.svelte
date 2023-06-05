<script>
	import ListDetails from "$lib/ListDetails.svelte";

	export let data;

	$: list = data.list;
</script>

<ListDetails
	{list}
	/>

<style>
</style>
