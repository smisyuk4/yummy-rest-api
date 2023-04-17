const { Recipes } = require('./schemas/recipes');

const getAllRecipes = async (condition, pagination) => {
  return Recipes.find(condition, '', pagination);
};

const getRecipes = async (condition, pagination) => {
  const recipes = Recipes.find(condition, '', pagination);
  if (!recipes) {
    // throw new WrongParametersError(`Not found contact id: ${contactId}`);
  }

  return recipes;
};

const getRecipesById = async (id) => {
  const result = await Recipes.findOne({ _id: id });

  if (!result) {
    throw new AppError(404, `Recipes with id ${id} not found`);
  }
  return result;
};

module.exports = {
  getAllRecipes,
  getRecipes,
  getRecipesById
};
