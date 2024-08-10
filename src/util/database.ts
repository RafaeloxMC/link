import mongoose from "mongoose";

export default async function connect() {
	mongoose.connect(process.env.MONGO_URI || "").then((connection) => {
		if (!connection) {
			console.error("Failed to connect to MongoDB.");
		}
	});
}
