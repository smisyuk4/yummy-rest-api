const express = require("express");
const router = express.Router();

const {
  get,
  searchByTitle,
  searchByIngredients,
  getCategoryListController,
  getCategoryController,
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

router.get("/category-list", getCategoryListController);

router.get("/main-page", asyncWrapper(getAllRecipesController));

router.get("/category/:category", asyncWrapper(getCategoryController));

router.get("/:id", asyncWrapper(getRecipesByIdController));

router.get("/search", asyncWrapper(searchByTitle));

router.get("/ingredients", asyncWrapper(searchByIngredients));

router.get("/recipes/popular-recipes", asyncWrapper(popularRecipes));

module.exports = { recipesRouter: router };
