import * as dao from "./dao.js";
// let currentUser = null;
function CommentsRoutes(app) {


  const findAllComments = async (req, res) => {
    const comments = await dao.findAllComments();
    res.json(comments);
  };

  const findCommentsByPostId = async (req, res) => {
    const { postId } = req.params;
    const comments = await dao.getCommentsByPostId(postId);
    // console.log("****************2", comments)
    res.json(comments);
  };

  const delComment= async (req, res) => {
    console.log("****************1", req.params.commentId, typeof(req.params.commentId))
    const comment = await dao.deleteComment(req.params.commentId);
    console.log("****************2", comment)
    res.sendStatus(200);
  };

  const createComment = async (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!like",req.body)
    const comment = await dao.newComment(req.body);
    res.json(comment);
  };



  app.get("/api/comments", findAllComments);
  app.get("/api/comments/:postId", findCommentsByPostId);
  app.post("/api/comments", createComment);
  app.delete("/api/comments/:commentId",delComment);

}
export default CommentsRoutes;