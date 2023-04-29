const { HttpError } = require('../helpers/HttpError');
const { Recipes } = require('./schemas/recipes');

const getAllRecipes = async (condition, pagination) => {
  return Recipes.find(condition, '', pagination);
};

const getRecipes = async (condition, pagination) => {
  const recipes = Recipes.find(condition, '', pagination);
  if (!recipes) {
    throw new HttpError(404, `Recipes with ${condition} not found`);
  }

  return recipes;
};

const getRecipesById = async id => {
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
    const fav = await Recipes.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { favorite: { $each: [user] } } }
    );
    const allFavorite = await getAllFavorite(user);
    return allFavorite.length;
  } catch (err) {
    throw new HttpError(404, `Recipes with id ${id} not found`);
  }
};

const removeFromFavorite = async (id, user) => {
  try {
    await Recipes.findByIdAndUpdate({ _id: id }, { $pull: { favorite: user } });
  } catch {
    throw new HttpError(404, `Recipes with id ${id} not found`);
  }
};

const getAllFavorite = async user => {
  const all = await Recipes.find({
    favorite: { $elemMatch: { $eq: user } },
  });
  return all;
};

const getAllFavoritePagination = async (user, { skip, limit }) => {
  const allFavorite = await Recipes.find({
    favorite: { $elemMatch: { $eq: user } },
  })
    .skip(skip)
    .limit(limit);

  return allFavorite;
};

module.exports = {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getCategory,
  getAllCategoryWithFourRecipes,
  getAllFavorite,
  getAllFavoritePagination,
  addToFavorite,
  removeFromFavorite,
};
