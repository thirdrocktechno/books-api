import mongoose from "mongoose";
import httpStatus from "http-status";

import {Constants} from "../config/environment";
import Logger from "../config/logger";
import ApiError from "../utils/ApiError";

const errorConverter = (err, req, res, next) => {
  let error = err;
  console.log('error :: ', err);
  
  
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (Constants.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message
  };

  Logger.error(err);

  res.status(statusCode).send(response);
};

export default {
  errorConverter,
  errorHandler,
};