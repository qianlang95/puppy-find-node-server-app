import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    description: String,
    postId:  String
  },
  { collection: "comment" });
export default commentSchema;

