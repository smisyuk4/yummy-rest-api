const { Ingredients } = require('./schemas/ingredients');

const getAllIngredients = async ingredient => {
  return Ingredients.find(ingredient);
};

const getIdIngredient = async field => {
  return Ingredients.findOne(field);
};

module.exports = {
  getAllIngredients,
  getIdIngredient,
};
