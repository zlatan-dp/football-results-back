const Joi = require("joi");

const joiRegSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const joiLogSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { joiRegSchema, joiLogSchema };
