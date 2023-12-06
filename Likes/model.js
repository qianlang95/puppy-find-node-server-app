import mongoose from "mongoose";
import schema from "./schema.js";
const likeModel = mongoose.model("Likes", schema);
export default likeModel;