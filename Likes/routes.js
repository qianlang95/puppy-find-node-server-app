import * as dao from "./dao.js";
// let currentUser = null;
function LikesRoutes(app) {


  const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes();
    res.json(likes);
  };

  const findLikesByBreedId = async (req, res) => {
    console.log("****************1", req.params.breedId, typeof(parseInt(req.params.breedId)))
    const likes = await dao.getLikesByBreedId(req.params.breedId);
    console.log("****************2", likes)
    res.json(likes);
  };

  const findBreedByUserId= async (req, res) => {
    console.log("****************1", req.params.breedId, typeof(req.params.breedId))
    const breeds = await dao.getBreedByUserId(req.params.userId);
    console.log("****************2", breeds)
    res.json(breeds);
  };

  const thumpUp = async (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!like",req.body)
    const like = await dao.createLike(req.body);
    res.json(like);
  };



  app.get("/api/likes", findAllLikes);
  app.get("/api/likes/:breedId", findLikesByBreedId);
  app.get("/api/likes/breeds/:userId", findBreedByUserId);
  app.post("/api/like", thumpUp)
}
export default LikesRoutes;