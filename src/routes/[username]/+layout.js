/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		username: params.username,
	};
}
