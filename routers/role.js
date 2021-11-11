import Router from "express";
import {RoleController} from "../controllers/role";
import passport from "passport";

const controller = new RoleController()
const roles = new Router()

roles.get('/roles', passport.authenticate('jwt', {session: false}), controller.get);

export default roles