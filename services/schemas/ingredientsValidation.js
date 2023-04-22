const Joi = require("joi");
const { HttpError } = require("../../helpers/HttpError");

const ingredientValidation = (req, res, next) => {
  let schema = Joi.object({
    ingredient: Joi.string().trim().min(3).max(30).required(),
  });
  const validationResult = schema.validate(req.query);
  if (validationResult.error) {
    throw HttpError(400, `${validationResult.error}`);
  }
  next();
};

module.exports = {
  ingredientValidation,
};
