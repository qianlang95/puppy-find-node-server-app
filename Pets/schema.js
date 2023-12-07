import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: {type:String, required: true},
    breed: {type:String, required: true},
    breedId:{type: Number, required: true},
    userId: Number,
    type: {type:String, required: true},
    age: {type:Number, required: true},
    location: {type:String, required: true},
    description: String,

}, {collection: "posts"}
);

export default postSchema;
