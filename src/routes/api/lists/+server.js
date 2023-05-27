import { json } from "@sveltejs/kit";
import { getListsCollection } from "../../../hooks.server";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const listsCollection = await getListsCollection();
	const lists = await listsCollection.find({ customfield: "grupp_e" }).toArray();

	return json(lists);
}
