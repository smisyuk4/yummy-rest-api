const express = require("express");
const router = express.Router();

const {
  get,
  searchByTitle,
  searchByIngredients,
  getRecipesByIdController,
  getAllRecipesController,
} = require("../controllers/recipesController");
const { popularRecipes } = require("../controllers/popularRecipesController");

const { asyncWrapper } = require("../helpers/asyncWrapper");
// const {getAllRecipes} = require
// const { authMiddleware } =  require('../middlewares/authMiddleware')
// const { upload } = require('../middlewares/uploadMiddleware')

// recipes/category-list
// recipes/main-page
// recipes/:category
// recipes/:id
// recipes/search
// recipes/ownRecipes
// recipes/favorite
// recipes/popular-recipe

router.get("/", asyncWrapper(get));

router.get("/main-page", asyncWrapper(getAllRecipesController));

router.get("/:id", asyncWrapper(getRecipesByIdController));

router.get("/search", asyncWrapper(searchByTitle));

router.get("/ingredients", asyncWrapper(searchByIngredients));

router.get("/recipes/popular-recipes", asyncWrapper(popularRecipes));

module.exports = { recipesRouter: router };
