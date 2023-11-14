import express from 'express';
import Hello from "./hello.js"
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json());

Hello(app)




app.listen(4001)