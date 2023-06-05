<script>
	import { goto } from "$app/navigation";

	let username;
</script>

<div class="flex h-[60vh] items-center justify-center">
	<input
		on:keydown={(e) => {
			if (e.code === "Enter") {
				goto(`/${username}`);
			}
		}}
		type="text"
		bind:value={username}
		required
		placeholder="Enter your username" />
	<a class="ml-2 rounded bg-green-400 p-2" href="/{username}">Go to your lists</a>
</div>

<style>
</style>
