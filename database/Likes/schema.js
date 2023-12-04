import mongoose from "mongoose";
const LikeSchema = new mongoose.Schema({
    breedId: String,
    
    userId: String,
    userName: String
  },
  { collection: "breedLikes" });
export default LikeSchema;