import Router from "express";
import passport from "passport";
import {ClaimController} from "../controllers/claim";

const controller = new ClaimController();
const claim = new Router()

claim.post('/claim', passport.authenticate('jwt', {session: false}), controller.create);
claim.put('/claim/:id', passport.authenticate('jwt', {session: false}), controller.update);
claim.get('/claim', passport.authenticate('jwt', {session: false}), controller.getAll);
claim.get('/claim/:id', passport.authenticate('jwt', {session: false}), controller.getById);
claim.delete('/claim/:id', passport.authenticate('jwt', {session: false}), controller.delete);

export default claim