const gravatar = require("gravatar");

const {
  getAllOwnRecipes,
  getAllOwnRecipesWithPagination,
  getOwnRecipesById,
  addRecipe,
  deleteRecipe,
} = require("../services/ownRecipesServices");

const { HttpError } = require("../helpers/HttpError");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const recipes = await getAllOwnRecipes({ owner });
  if (!recipes) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(recipes);
};

const getAllWithPagination = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const pagination = { skip, limit };
  const recipes = await getAllOwnRecipesWithPagination({ owner }, pagination);
  if (!recipes) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    currentPage: page,
    countRecipes: recipes.length,
    recipes: recipes,
  });
};

const getById = async (req, res, next) => {
  const recipe = await getOwnRecipesById(req.params.id);
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(recipe);
};

const create = async (req, res, next) => {
  const { _id: owner } = req.user;

  let recipeImg;

  if (req.file) {
    recipeImg = req.file.path;
  } else {
    recipeImg = "/recipeDefaultImg.png";
  }

  const recipeData = { ...req.body, imageURL: recipeImg };

  const newRecipe = await addRecipe({ ...recipeData, owner });
  res.status(201).json(newRecipe);
};

const remove = async (req, res, next) => {
  const recipe = await deleteRecipe(req.params.id);
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Recipe deleted" });
};

module.exports = {
  getAllWithPagination,
  getAll,
  getById,
  remove,
  create,
};
