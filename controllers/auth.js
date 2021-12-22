import bcrypt from 'bcrypt';
import Users from '../models/User';
import Roles from '../models/Role';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";
import {WORK} from "../types/roles";

dotenv.config();

const generateAccessToken = (id, email) => {
    return jsonwebtoken.sign({id, email}, process.env.SECRET_KEY, {expiresIn: "1d"})
}

export class AuthController {
    async registration(req, res) {
        try {
            const {fullName, email, password} = req.body;
            const candidate = await Users.findOne({email});
            if (candidate) {
                return res.status(409).json({message: "A user with this username already exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const userRole = await Roles.findOne({slug: WORK})
            const user = new Users({fullName, email, password: hashPassword, role: userRole});
            await user.save();
            const token = generateAccessToken(user.id, user.email);
            return res.status(200).json({
                token,
                role: {name: user.role.name, slug: user.role.slug},
                user_id: user.id,
                fullName: user.fullName,
                email: user.email});
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'});
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email}).populate({path: 'role', select: 'name slug -_id'});
            if (!user) {
                return res.status(401).json({message: 'Login error', code: 'email'});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Password error', code: 'password'});
            }
            const token = generateAccessToken(user.id, user.email);
            return res.json({token, role: user.role, user_id: user.id, fullName: user.fullName, email: user.email})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}