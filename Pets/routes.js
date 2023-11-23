import Database from "../Database/index.js";

function PetRoutes(app){

    app.get("/api/pets/:id", (req,res) =>{
        const {id} = req.params;
        const pet = Database.pets.find( (p) =>  p._id === id );
        if(!pet){
            res.status(404).send("404 Pet not Found!");
            return;
        }
        res.send(pet);
    } )

    app.put("/api/pets/:id", (req,res) => {
        const {id} = req.params;
        const pet = req.body;
        console.log("Checking if the update works")
        Database.pets = Database.pets.map( (p) => p._id === id ? {...pet} : p );
        res.sendStatus(204)
    } )


    app.delete("/api/pets/:id", (req,res) => {
        const {id} = req.params;
        Database.pets = Database.pets.filter( (p) => p._id !== id  );
        res.sendStatus(204)
    } )


    app.post("/api/pets", (req,res) => {
        const pet = {...req.body, _id: new Date().getTime().toString() }
        Database.pets.push(pet)
        res.send(pet);
    } )

    app.get("/api/pets", (req,res) => {
        const pets = Database.pets;
        res.json(pets)
    })


}

export default PetRoutes;