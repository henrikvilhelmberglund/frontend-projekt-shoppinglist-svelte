import { MongoClient } from "mongodb";
import { envVariables } from "/src/lib/envVariables";

export async function connectToMongoDB() {
	let client;
	try {
		// client = new MongoClient("mongodb://127.0.0.1:27017");
		client = new MongoClient(
			`mongodb+srv://henrikvilhelmberglund:${envVariables.mongoPass}@cluster0.9bryuke.mongodb.net/?retryWrites=true&w=majority`
		);
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.info("Pinged your deployment. You successfully connected to MongoDB!");
	} catch (error) {
		console.error(error);
	}
	return client;
}
