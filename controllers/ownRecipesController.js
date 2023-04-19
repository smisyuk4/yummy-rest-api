const gravatar = require("gravatar");
const {getIdIngredient} = require('../services/ingredientsServices')
const {
  getAllOwnRecipes,
  getOwnRecipesById,
  addRecipe,
  updateRecipeStatus,
  deleteRecipe,
} = require("../services/ownRecipesServices");

const HttpError = require("../helpers/HttpError");

const get = async (req, res, next) => {
  const { _id: owner } = req.user;
  const recipes = await getAllOwnRecipes({ owner });
  res.status(200).json(recipes);
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
  const arrIngredients = req.body.ingredients
  const arrNamesIngredient = arrIngredients.map(async (ingredient) => {
    const nameIngred = ingredient.item;
    const amount = ingredient.quantity
    const idIngred = await getIdIngredient({nameIngred})
    return {
      item: nameIngred,
      quantity : amount,
      idIngredient: idIngred,
    }
  })

  const recipeData = {
    ...req.body,
    imageURL: gravatar.url(req.body.title, {
      protocol: "https",
      s: "250",
    }),
  };
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

const updateStatus = async (req, res, next) => {
  const recipe = await updateRecipeStatus(req.params.id, req.body);
  if (!recipe) {
    throw HttpError(404, "Not found");
    return;
  }
  res.status(200).json(recipe);
};

module.exports = {
  get,
  getById,
  remove,
  create,
  updateStatus,
};
