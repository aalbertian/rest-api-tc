import Router from "express";
import {StatusController} from "../controllers/status";
import passport from "passport";

const controller = new StatusController()
const status = new Router()

status.get('/status', passport.authenticate('jwt', {session: false}), controller.get);

export default status