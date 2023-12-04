import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import session from "express-session";

const app = express()
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: "jwt-secret-key",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);
  
   
app.use(express.json());

Hello(app)




app.listen(4001)