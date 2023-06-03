import { json } from "@sveltejs/kit";
import { getListsCollection } from "/src/hooks.server";
import { ObjectId } from "mongodb";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	console.log(params.listid);
	const list = await listsCollection.findOne({
		customfield: "grupp_e",
		_id: new ObjectId(params.listid),
	});

	// console.log(list);

	return json(list);
}

export async function DELETE({ params }) {
	// console.log(params.listid);
	const list = await listsCollection.deleteOne({
		customfield: "grupp_e",
		_id: new ObjectId(params.listid),
	});

	return json({
		success: true,
		list,
	});
}
