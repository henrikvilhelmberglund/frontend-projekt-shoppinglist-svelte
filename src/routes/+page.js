/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	// const auth = await checkLoginStatus(fetch);
	// if (!auth.user) {
	// 	return {
	// 		// instead of throwing an error I return it to the load function so I can display something else than just an error page
	// 		error: 401,
	// 	};
	// }

	const res = await fetch("http://localhost:5173/api/lists");
	const data = await res.json();
	// can't serialize BSON ID

	return {
		lists: data.reverse(),
	};
}
