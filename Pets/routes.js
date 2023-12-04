import Database from "../Database/index.js";
import * as dao from "./dao.js"

function PetRoutes(app){

    const createPost = async (req,res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    }



    // const updatePost = async (req,res) => {
    //     const {postId} = req.params;
    //     const post = req.body;
    //     const status = await dao.updatePost(postId, post);
    //     res.json(status);

    // }

    const updatePost = (req, res) => {
        const postId = req.params.id; // Ensure this matches the named route parameter
        const post = req.body;
    
        dao.updatePost(postId, post)
            .then(status => {
                console.log('Update status:', status);
                res.json(status);
            })
            .catch(error => {
                console.error('Update error:', error);
                res.status(500).json({ error: error.message });
            });
    };


    // app.put("/api/pets/:id", (req,res) => {
    //     const {id} = req.params;
    //     const pet = req.body;
    //     console.log("Checking if the update works")
    //     Database.pets = Database.pets.map( (p) => p._id === id ? {...pet} : p );
    //     res.sendStatus(204)
    // } )

    // const checkingiD = async (req,res) => {
    //     // const postId = req.params;
    //     console.log("Check Here -> ",req.params);
    //     res.json(req.params)
    //     // const postData = req.body;
    //     // console.log(`postId in the router translate to ${postId}`);
    // }

    const deletePost = async (req,res) => {
        const status = await dao.deletePost(req.params.postId);
        res.json(status);
        console.log(`Succesfully deleted ${req.params.postId}`)
    }


    // app.delete("/api/pets/:id", (req,res) => {
    //     const {id} = req.params;
    //     Database.pets = Database.pets.filter( (p) => p._id !== id  );
    //     res.sendStatus(204)
    // } )


    // app.post("/api/pets", (req,res) => {
    //     const pet = {...req.body, _id: new Date().getTime().toString() }
    //     Database.pets.push(pet)
    //     res.send(pet);
    // } )

    const findAllPosts = async (req,res) =>{
        const posts = await dao.findAllPosts();
        res.json(posts);
    }



    app.post("/api/pets",createPost );
    app.put("/api/pets/:id", updatePost);
    app.delete("/api/pets/:postId", deletePost)
    app.get("/api/pets", findAllPosts);



}

export default PetRoutes;