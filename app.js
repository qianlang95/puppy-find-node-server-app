import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import Comment from './comment.js';
import mongoose from "mongoose";
import PetRoutes from "./Breed/routes.js";
import LikesRoutes from './Likes/routes.js';
import CommentsRoutes from './comment/routes.js';



// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/Puppy'
const CONNECTION_STRING = 'mongodb+srv://puppy:puppy123456@cluster1.6czondc.mongodb.net/?retryWrites=true&w=majority'
console.log('you are connect to db: '+CONNECTION_STRING,"@@@@@@@@@@@@@@@#########################")
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
    cors(
        {
            credentials: true,
            origin: 'http://localhost:3000',
         
        }
    )
);
app.use(express.json());

Hello(app)
PetRoutes(app)
LikesRoutes(app)
CommentsRoutes(app)




app.listen(4000)