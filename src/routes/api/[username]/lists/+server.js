import { json } from "@sveltejs/kit";
import { getListsCollection } from "/src/hooks.server";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	console.log(params);
	const lists = await listsCollection
		.find({ customfield: "grupp_e", username: params.username })
		.toArray();

	return json(lists);
}

export async function POST({ request }) {
	const data = await request.json();
	console.log(data);
	const lists = await listsCollection.insertOne(data);

	return json({
		success: true,
		list: data,
	});
}
