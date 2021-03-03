import { ExtractJwt, Strategy } from "passport-jwt";
import Author from "../models/author.model";
import {Constants} from "../config/environment"

const jwtOptions = {
  secretOrKey: Constants.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
};

let jwt = async (payload, done) => {
  try {
    const user = await Author.findOne({ _id: Object(payload.sub)});
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};


export default jwt = new Strategy(jwtOptions, jwt);;
