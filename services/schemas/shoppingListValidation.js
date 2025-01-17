const Joi = require('joi');

const shoppingListValidation = Joi.object({
  ingredientId: Joi.string().required(),
  measure: Joi.string().required(),
  ttl: Joi.string().required(),
  thb: Joi.string().uri(),
  recipeId: Joi.string().required()
});

module.exports = {
  shoppingListValidation,
};
