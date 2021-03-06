import Joi from "joi";
import { app } from "../app";

export default {
  // POST /v1/auth/login
  login: {
    body: {
      email: Joi.string()
        .email()
        .required().label('Email'),
      password: Joi.string()
        .required()
        .max(128).label('Password'),
    },
  },
};