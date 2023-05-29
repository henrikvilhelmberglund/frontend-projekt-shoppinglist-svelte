import { json } from "@sveltejs/kit";
import { getListsCollection } from "../../../hooks.server";
import { ObjectId } from "mongodb";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	console.log(params.id);
	const list = await listsCollection.findOne({
		customfield: "grupp_e",
		_id: params.id,
	});

	console.log(list);

	return json(list);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const data = await request.json();
	console.log(data);

	// TODO look in real API for a way to get an item
	const list = await listsCollection.findOne({
		customfield: "grupp_e",
		"itemList._id": data.id,
	});
	console.log(list);

	return json(list);
}
