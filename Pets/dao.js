
import mongoose from "mongoose";
import model from "./model.js";

export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();
export const findPostById = (postId) => model.findById(postId);
export const findPostByBreedId = (breedId) => model.find({breedId: breedId});

// export const updatePost = (postId, post) => model.updateOne({_id:postId}, {$set:post});

export const updatePost = (postId, post) => {

    console.log(`Before conversion postId: ${postId}`)
    console.log(`Before conversion post: ${post}`)

    return model.updateOne({ _id: postId }, { $set: post });
}

export const deletePost = (postId, post) => model.deleteOne({_id:postId});