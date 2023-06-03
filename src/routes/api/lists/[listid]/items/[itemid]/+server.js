import { json } from "@sveltejs/kit";
import { getListsCollection } from "/src/hooks.server";
import { ObjectId } from "mongodb";

const listsCollection = await getListsCollection();

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, params }) {
	const data = await request.json();
	console.info("params", params);

	let list = await listsCollection.findOne({
		customfield: "grupp_e",
		_id: new ObjectId(params.listid),
	});

	const itemList = list.itemList || [];
	const item = itemList.find((item) => item._id.toString() === params.itemid);

	console.info("item", item);
	console.warn("data", data);

	await listsCollection.updateOne(
		{
			customfield: "grupp_e",
			_id: new ObjectId(params.listid),
			itemList: { $elemMatch: { _id: new ObjectId(params.itemid) } },
		},
		{
			$set: {
				"itemList.$": { ...item, ...data },
			},
		}
	);

	list = await listsCollection.findOne({ _id: new ObjectId(params.listid) });

	return json(list);
}
