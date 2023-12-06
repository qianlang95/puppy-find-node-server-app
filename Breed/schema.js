import mongoose from "mongoose";
const breedSchema = new mongoose.Schema({
    breedId: { type: String, required: true},
    name: { type: String, required: true },
    funFact1: String,
    funFact2: String,
    funFact3: String,
  },
  { collection: "pet" });
export default breedSchema;