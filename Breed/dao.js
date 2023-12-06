import model from "./model.js";


export const findAllBreeds = () => model.find();

export const findLimitedBreeds = () => model.find().limit(40);


export const findBreedIdByName = (breedName) => model.findOne({ name: breedName });

export const getBreedByBreedId = (breed) => model.findOne({ breedId: breed });
