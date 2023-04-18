const { HttpError } = require("../helpers/HttpError");

const { Recipes } = require("./schemas/recipes");

const getAllRecipes = async (condition, pagination) => {
  return Recipes.find(condition, "", pagination);
};

const getRecipes = async (condition, pagination) => {
  const recipes = Recipes.find(condition, "", pagination);
  if (!recipes) {
    // throw new WrongParametersError(`Not found contact id: ${contactId}`);
  }

  return recipes;
};

const getRecipesById = async (id) => {
  const result = await Recipes.findOne({ _id: id });

  if (!result) {
    throw new HttpError(404, `Recipes with id ${id} not found`);
  }
  return result;
};

const getCategory = async (category, { skip, limit }) => {
  const result = await Recipes.find({ category: category })
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new HttpError(404, `Recipes with id ${category} not found`);
  }
  return result;
};

const getAllCategoryWithFourRecipes = async (resultCategory, { limit }) => {
  let AllCategoryWithFourRecipes = [];

  for (let index = 0; index < resultCategory.length; index++) {
    const element = resultCategory[index];
    const result = await Recipes.find({ category: element }).limit(limit);
    if (!result) {
      throw new HttpError(404, `Recipes with id ${element} not found`);
    }
    AllCategoryWithFourRecipes = [...AllCategoryWithFourRecipes, result];
    // AllCategoryWithFourRecipes.push(result);
  }
  return AllCategoryWithFourRecipes;
};

module.exports = {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getCategory,
  getAllCategoryWithFourRecipes,
};
