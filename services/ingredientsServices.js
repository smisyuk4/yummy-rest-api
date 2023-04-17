const { WrongParametersError } = require('../helpers/error')
const { Ingredients } = require('./schemas/ingredients')
const { Recipes } = require('./schemas/recipes')
const { User } = require('./schemas/users')

const getAllIngredients = async (condition, pagination ) => {
    return Ingredients.find(condition, "", pagination)
  }



const getAllRecipesByIngredient = async (ingredient, userId) => {
  const ingredient = await Ingredients.findOne({ ttl: `${ingredient}` })
  if (!ingredient) {
        throw new WrongParametersError(
          `Failure! There is no ingredient found with name: ${ingredient}`
        );
      }
  
  
  const baseRecipesByIngredients = await Recipes.find({ ingredients: {$elemMach: { id: ObjectId(`${ingredient._id}`) }}})
  // const userRecipecByIngredients = await User.find({$and: [{ ingredients: {$elemMach: { id: ObjectId(`${ingredient._id}`)}}}, {userId: `${userId}`}]});
  const globalRecipes = [
  // ...userRecipecByIngredients,
  ...baseRecipesByIngredients]
  return globalRecipes

}


module.exports = {
  getAllIngredients,
  getAllRecipesByIngredient,
}