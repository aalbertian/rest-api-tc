import Router from "express";
import {TypeController} from "../controllers/type";
import passport from "passport";

const controller = new TypeController()
const types = new Router()

types.get('/types', passport.authenticate('jwt', {session: false}), controller.get);

export default types