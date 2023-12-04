import Database from "../Database/index.js";
import * as dao from "./dao.js"

function PetRoutes(app){

    const createPost = async (req,res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    }



    const updatePost =  async(req, res) => {
        const postId = req.params.id; 
        const post = req.body;
    
        // dao.updatePost(postId, post)
        //     .then(status => {
        //         console.log('Update status:', status);
        //         res.json(status);
        //     })
        //     .catch(error => {
        //         console.error('Update error:', error);
        //         res.status(500).json({ error: error.message });
        //     });

        //To visualize the updated post by reading the whole status content
        const status = await  dao.updatePost(postId, post).then(status => {console.log(`Update Status: ${status}`); res.json(status)  })
       
    };




    const deletePost = async (req,res) => {
        const status = await dao.deletePost(req.params.postId);
        res.json(status);
        console.log(`Succesfully deleted ${req.params.postId}`)
    }



    const findAllPosts = async (req,res) =>{
        const posts = await dao.findAllPosts();
        res.json(posts);
    }

    const findPostById = async (req,res) => {
        console.log(`Logging post with ID ${req.params.postId}`)
        const post = await dao.findPostById(req.params.postId);
        res.json(post);
    }



    app.post("/api/pets",createPost );
    app.put("/api/pets/:id", updatePost);
    app.delete("/api/pets/:postId", deletePost)
    app.get("/api/pets", findAllPosts);
    app.get("/api/posts/:postId", findPostById);




}

export default PetRoutes;