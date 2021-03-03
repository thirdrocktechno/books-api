import httpStatus from "http-status";
import jwt from "jwt-simple";
import moment from "moment-timezone";
import bcrypt from "bcrypt";
import { Constants } from "../config/environment"
import ApiError from "../utils/ApiError";
import messages from "../config/locales/en.json";
import Logger from "../config/logger";
import Author from "../models/author.model"

const findByEmailId = async (email) => {
  try {
    Logger.info('******** INFO :: user model :: findByEmailId ********');
    let authorObj = await Author.findOne({ email, isActive: true });    
    return authorObj;
  } catch (error) {
    Logger.info('******** ERROR :: user model :: findByEmailId ********');
    Logger.info(error);
    return error;
  }
};

const passwordMatches = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

const token = async (id) => {
  const payload = {
    exp: moment().add(Constants.env.JWT_EXPIRATION_INTERVAL, 'days').unix(),
    iat: moment().unix(),
    sub: id,
  };
  return jwt.encode(payload, Constants.env.JWT_SECRET);
};

const transform = async (user) => {
  const transformed = {};
  const fields = ['id', 'firstName', 'lastName', 'gender', 'city'];
  fields.forEach((field) => {
    transformed[field] = user[field];
  });
  return transformed;
};

const login = async (user, password) => {
  if (password) {
    if (user && await passwordMatches(password, user.password)) {
      return { isSuccess: true, user: await transform(user), accessToken: await token(user._id) };
    }
    throw new ApiError(httpStatus.NOT_FOUND, messages.userMessage.invalidCredential)
  }
};

export default {
  findByEmailId,
  login,
  transform,
  passwordMatches 
}