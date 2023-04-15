const { Recipes } = require('./schemas/recipes')

const getAllRecipes = async (condition, pagination ) => {
    return Recipes.find(condition, "", pagination)
  }

module.exports = {
    getAllRecipes,
}