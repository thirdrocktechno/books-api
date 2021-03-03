import Joi from "joi";

export default {
  // POST /books
  addBook: {
    body: {
      title: Joi.string().required().label('Title'),
      description: Joi.string().label('Description'),
    },
  },
};
