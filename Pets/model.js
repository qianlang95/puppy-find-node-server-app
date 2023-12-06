import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("posts", schema);
export default model;