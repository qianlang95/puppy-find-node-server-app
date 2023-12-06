import mongoose from "mongoose";
import schema from "./schema.js";
const breedModel = mongoose.model("breed", schema);
export default breedModel;