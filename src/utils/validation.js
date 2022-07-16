const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(200).required(),
    lastName: Joi.string().min(2).max(200).required(),
    username: Joi.string().min(2).max(200).required(),
    email: Joi.string().min(5).max(200).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation };
