import "dotenv/config.js"
import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import PetRoutes from './Pets/routes.js';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(express.json());
app.use(cors({
    origin : "http://localhost:3001"
}
));

PetRoutes(app)
Hello(app)




app.listen(4001)