import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import Comment from './comment.js';


const app = express()
app.use(cors());
app.use(express.json());

Hello(app)
Comment(app)





app.listen(4002)