import express from 'express';
import Hello from "./hello.js"
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import UserRoutes from "./users/routes.js";
import FollowsRoutes from './follows/routes.js';



const CONNECTION_STRING = 'mongodb+srv://puppy:puppy123456@cluster1.6czondc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const app = express();
  app.use(
   cors({
     credentials: true,
     origin: "http://localhost:3000",
   })
  );
  
  
  const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  app.use(session(sessionOptions));
  
  app.use(express.json());


Hello(app);
UserRoutes(app);
FollowsRoutes(app);



app.listen(4000)