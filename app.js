import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import PetRoutes from './Pets/routes.js';

const app = express()
app.use(express.json());
app.use(cors());

PetRoutes(app)
Hello(app)




app.listen(4001)