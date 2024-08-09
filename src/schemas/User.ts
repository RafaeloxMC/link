import mongoose, { Schema, Document, Model } from "mongoose";

const UserSchema: Schema = new Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.models["User"] || mongoose.model("User", UserSchema);