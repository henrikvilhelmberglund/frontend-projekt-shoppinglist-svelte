import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { getListsCollection } from "/src/hooks.server";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const data = await request.json();
	console.log(data);
	let list = await listsCollection.findOne({ _id: new ObjectId(params.listid) });

	if (!list) {
		return json({ status: 404, message: "List not found, did you use a correct ID?" });
	}

	const newItem = { _id: new ObjectId(), ...data };

	const updatedRecord = await listsCollection.updateOne(
		{ _id: new ObjectId(params.listid) },
		{ $push: { itemList: newItem } }
	);

	list = await listsCollection.findOne({ _id: new ObjectId(params.listid) });

	// const lists = await listsCollection.insertOne(data);

	return json({
		success: true,
		list,
	});
}
