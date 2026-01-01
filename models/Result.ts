import mongoose, { Schema, model, models } from "mongoose";

const ResultSchema = new Schema({
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    email: { type: String }, // Optional
    name: { type: String }, // Optional
    createdAt: { type: Date, default: Date.now },
});

const Result = models.Result || model("Result", ResultSchema);

export default Result;
