import commentModel from "./model.js";


export const findAllComments = () => commentModel.find();

export const getCommentsByPostId = (postId) => commentModel.find({ postId: postId });

export const deleteComment = (commentId) => commentModel.deleteOne({ _id: commentId });


export const newComment = (c) => commentModel.create(c);