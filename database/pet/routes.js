import * as dao from "./dao.js";
// let currentUser = null;
function PetRoutes(app) {


  const findAllBreeds = async (req, res) => {
    const breeds = await dao.findAllBreeds();
    res.json(breeds);
  };


  const getBreedIdByName = async (req, res) => {
    const breedId = await dao.findBreedIdByName(req.params.breedName);
    res.json(breedId);
  };

  const findBreedByDogId = async (req, res) => {
    console.log("****************1", req.params.breedId, typeof(parseInt(req.params.breedId)))
    const breed = await dao.getBreedByBreedId(parseInt(req.params.breedId));
    console.log("****************2", breed)
    res.json(breed);
  };

  const findBreedByCatId = async (req, res) => {
    console.log("****************1", req.params.breedId, typeof(req.params.breedId))
    const breed = await dao.getBreedByBreedId(req.params.breedId);
    console.log("****************2", breed)
    res.json(breed);
  };




  app.get("/api/breeds", findAllBreeds);
  app.get("/api/breedId/:breedName", getBreedIdByName);
  app.get("/api/dogs/:breedId", findBreedByDogId);
  app.get("/api/cats/:breedId", findBreedByCatId);
}
export default PetRoutes;