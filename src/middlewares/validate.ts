import joi from "joi";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import Pick from "../utils/pick";

const validate = (schema) => (req, res, next) => {
  const validSchema = Pick(schema, ['params', 'query', 'body', 'headers']);
  const object = Pick(req, Object.keys(validSchema));
  const { value, error } = joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message.replace(/"/g, '') ).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
