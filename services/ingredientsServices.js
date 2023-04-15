const { Ingredients } = require('./schemas/ingredients')

const getAllIngredients = async (condition, pagination ) => {
    return Ingredients.find(condition, "", pagination)
  }

module.exports = {
  getAllIngredients,
}