import { json } from "@sveltejs/kit";
import { getListsCollection } from "/src/hooks.server";
import { ObjectId } from "mongodb";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	console.log(params.listid);
	const list = await listsCollection.findOne({
		customfield: "grupp_e",
		_id: params.listid,
	});

	// console.log(list);

	return json(list);
}
