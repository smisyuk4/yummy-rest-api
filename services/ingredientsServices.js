const { Ingredients } = require('./schemas/ingredients');
const { Recipes } = require('./schemas/recipes');
const { User } = require('./schemas/users');

const getAllIngredients = async () => {
  return Ingredients.find();
};

const getAllRecipesByIngredient = async (ingredient, userId) => {
  // const ingredient = await Ingredients.findOne({ ttl: `${ingredient}` })
  // if (!ingredient) {
  //       throw new WrongParametersError(
  //         `Failure! There is no ingredient found with name: ${ingredient}`
  //       );
  //     }
  // const baseRecipesByIngredients = await Recipes.find({ ingredients: {$elemMach: { id: ObjectId(`${ingredient._id}`) }}})
  // // const userRecipecByIngredients = await User.find({$and: [{ ingredients: {$elemMach: { id: ObjectId(`${ingredient._id}`)}}}, {userId: `${userId}`}]});
  // const globalRecipes = [
  // // ...userRecipecByIngredients,
  // ...baseRecipesByIngredients]
  // return globalRecipes
};

const getIdIngredient = (field) => {
  return Ingredients.findOne(field);
}
module.exports = {
  getAllIngredients,
  getAllRecipesByIngredient,
  getIdIngredient,
};
