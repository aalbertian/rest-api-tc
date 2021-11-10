import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import auth from "./routers/auth";
import user from "./routers/user";
import claim from "./routers/claim";
import passport from "passport";
import authJwtMiddleware from "./middleware/authJwtMiddleware";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000

dotenv.config();
const app = express();
app.use(passport.initialize())
authJwtMiddleware(passport)
app.use(express.json());
app.use(cors());
app.use('/auth', auth);
app.use(user);
app.use(claim)

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT))
    } catch(e) {
        console.log(e)
    }
}

start();