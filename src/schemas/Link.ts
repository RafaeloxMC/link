import mongoose, { Schema, Document, Model } from "mongoose";

const LinkSchema: Schema = new Schema({
    short: {
        type: String,
        required: true,
    },
    original: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    lastClick: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    owner: {
        type: String,
        required: true,
    },
});

export default mongoose.models["Link"] || mongoose.model("Link", LinkSchema);