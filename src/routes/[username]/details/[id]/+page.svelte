<script>
	import ListDetails from "$lib/ListDetails.svelte";

	export let data;

	$: list = data.list;
</script>

<ListDetails
username={data.username}
	{list}
	/>

<style>
</style>
