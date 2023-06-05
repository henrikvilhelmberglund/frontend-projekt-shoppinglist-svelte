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

export async function PUT({ request, params }) {
	const data = await request.json();
	console.log("data:", data);
	const list = await listsCollection.findOne({
		customfield: "grupp_e",
		_id: new ObjectId(params.listid),
	});
	const updatedList = await listsCollection.updateOne(list, { $set: data });

	return json({
		success: true,
		list: data,
	});
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
