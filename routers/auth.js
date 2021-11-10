import Router from "express";
import {AuthController} from "../controllers/auth";

const controller = new AuthController()
const auth = new Router()

auth.post('/registration', controller.registration);
auth.post('/login', controller.login);

export default auth