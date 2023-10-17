import { MongoClient, ObjectId } from "mongodb";
import console from "hvb-console";
import jwt from "jsonwebtoken";
import { connectToMongoDB } from "$lib/server/mongoConnect";

let client;
let user;

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	// Apply CORS header for API routes
	if (event.url.pathname.startsWith("/api")) {
		// Required for CORS to work
		if (event.request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "*",
				},
			});
		}
	}
	// get cookies from browser
	const session = event.cookies.get("AuthorizationToken");

	if (!session) {
		// if there is no session load page as normal
		const response = await resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace("%unocss-svelte-scoped.global%", "unocss_svelte_scoped_global_styles"),
		});
		return response;
		// return await resolve(event);
	}

	const usersCollection = await getUsersCollection();
	const token = session.split(" ")[1];
	const jwtID = jwt.verify(token, "a very secret key");
	// console.info("jwtID", jwtID);

	// running this on every request is probably not very smart
	user = await usersCollection.findOne({ _id: new ObjectId(jwtID.id) });

	// console.warn("user:", user);
	if (user) {
		event.locals.user = user.user;
		event.locals.id = user._id.toString();
	}
	// console.info("hooks.server.js", event.locals);

	// return await resolve(event);

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace("%unocss-svelte-scoped.global%", "unocss_svelte_scoped_global_styles"),
	});
	// add to response headers to allow /api connections from outside of the server
	if (event.url.pathname.startsWith("/api")) {
		response.headers.append("Access-Control-Allow-Origin", `*`);
	}
	return response;
};

export async function getUsersCollection() {
	if (!client) {
		client = await connectToMongoDB();
	}
	const db = client.db("itemtracker");
	return db.collection("users");
}

export async function getListsCollection() {
	if (!client) {
		client = await connectToMongoDB();
	}
	const db = client.db("itemtracker");
	return db.collection("lists");
}

export function updateHookedUser(inputUser) {
	user = inputUser;
}

export function removeHookedUser() {
	user = undefined;
}
