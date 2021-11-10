import Router from "express";
import passport from "passport";
import {UserController} from "../controllers/user";

const controller = new UserController()
const user = new Router()

user.post('/user', passport.authenticate('jwt', {session: false}), controller.create);
user.put('/user/:id', passport.authenticate('jwt', {session: false}), controller.update);
user.get('/user', passport.authenticate('jwt', {session: false}), controller.getAll);
user.get('/user/:id', passport.authenticate('jwt', {session: false}), controller.getById);
user.delete('/user/:id', passport.authenticate('jwt', {session: false}), controller.delete);

export default user