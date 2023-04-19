const { Ingredients } = require('./schemas/ingredients')


const getAllIngredients = async () => {
  return Ingredients.find();
};

module.exports = {
  getAllIngredients,
}
