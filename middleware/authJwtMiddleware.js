import {Strategy, ExtractJwt} from 'passport-jwt';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const authJwtMiddleware = (passport) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const Users = await mongoose.model('Users')
                const user = await Users.findOne({_id: payload.id});
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch(e) {
                console.log(e)
            }
        })
    )
}

export default authJwtMiddleware