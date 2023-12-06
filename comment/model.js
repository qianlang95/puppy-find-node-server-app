import mongoose from "mongoose";
import commentSchema from "./schema.js";
const commentModel = mongoose.model("comment", commentSchema);
export default commentModel;