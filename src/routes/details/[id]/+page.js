/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	// const auth = await checkLoginStatus(fetch);
	// if (!auth.user) {
	// 	return {
	// 		// instead of throwing an error I return it to the load function so I can display something else than just an error page
	// 		error: 401,
	// 	};
	// }

	const res = await fetch(`/api/lists/${params.id}`);
	const data = await res.json();
	// can't serialize BSON ID

	return {
		list: data,
	};
}
