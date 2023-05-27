import { MongoClient } from "mongodb";

export async function connectToMongoDB() {
	let client;
	try {
		client = new MongoClient("mongodb://127.0.0.1:27017");
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.info("Pinged your deployment. You successfully connected to MongoDB!");
	} catch (error) {
		console.error(error);
	}
	return client;
}
