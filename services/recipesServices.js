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

const getPopularRecipes = async (condition, pagination) => {
  const recipes = Recipes.find(condition, "", pagination);
  return recipes.sort((a, b) => b.favourite - a.favourite);
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

  return result;
};

const getAllCategoryWithFourRecipes = async (resultCategory, { limit }) => {
  let AllCategoryWithFourRecipes = [];

  for (let index = 0; index < resultCategory.length; index++) {
    const element = resultCategory[index];
    const result = await Recipes.find({ category: element }).limit(limit);
    if (!result) {
      throw new HttpError(404, `Category not found`);
    }
    AllCategoryWithFourRecipes = [...AllCategoryWithFourRecipes, result];
    // AllCategoryWithFourRecipes.push(result);
  }
  return AllCategoryWithFourRecipes;
};

const addToFavorite = async (id, user) => {
  try {
    await Recipes.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { favorite: { $each: [user] } } }
  );
  } catch (err) {
      throw new HttpError(500, err.message);
  }
  
};

const removeFromFavorite = async (id, user) => {
  try {
    await Recipes.findByIdAndUpdate(
    { _id: id },
    { $pull: { favorite: user } }
  );
  } catch (err) {
    throw new HttpError(500, err.message);
  }
  
};

const getAllFavorite = async (user) => {
  const allFavorite = await Recipes.find({ favorite: { $elemMath: { user } } })
  if (!allFavorite) {
    throw new HttpError(404, `User with id ${user} does not have favorite recipes`);
  }
  return allFavorite;
};


module.exports = {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getPopularRecipes,
  getCategory,
  getAllCategoryWithFourRecipes,
  getAllFavorite,
  addToFavorite,
  removeFromFavorite,
};
