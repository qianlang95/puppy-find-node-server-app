import Database from "../Database/index.js";
import * as dao from "./dao.js"

function PetRoutes(app){

    const createPost = async (req,res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    }

    // app.get("/api/pets/:id", (req,res) =>{
    //     const {id} = req.params;
    //     const pet = Database.pets.find( (p) =>  p._id === id );
    //     if(!pet){
    //         res.status(404).send("404 Pet not Found!");
    //         return;
    //     }
    //     res.send(pet);
    // } )

    const updatePost = async (req,res) => {
        const {postId} = req.params;
        const status = await dao.updatePost(postId, req.body);
        res.json(status);

    }

    // app.put("/api/pets/:id", (req,res) => {
    //     const {id} = req.params;
    //     const pet = req.body;
    //     console.log("Checking if the update works")
    //     Database.pets = Database.pets.map( (p) => p._id === id ? {...pet} : p );
    //     res.sendStatus(204)
    // } )

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

    // app.get("/api/pets", (req,res) => {
    //     const pets = Database.pets;
    //     res.json(pets)
    // })


    app.post("/api/pets",createPost );
    app.put("/api/pets/:id",updatePost);
    app.delete("/api/pets/:postId", deletePost)
    app.get("/api/pets", findAllPosts);



}

export default PetRoutes;