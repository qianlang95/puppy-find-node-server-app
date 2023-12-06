import breedModel from "./model.js";


export const findAllLikes = () => breedModel.find();

export const getLikesByBreedId = (breedId) => breedModel.find({ breedId: breedId });

export const getBreedByUserId = (userId) => breedModel.find({ userId: userId });


export const createLike = (like) => breedModel.create(like);
