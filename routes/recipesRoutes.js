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
  popularRecipesController,
  getAllFavoriteController,
  addToFavoriteController,
  removeFromFavoriteController,
} = require("../controllers/recipesController");

// const { popularRecipes } = require("../controllers/popularRecipesController");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const { protectPath } = require("../middlewares/authMiddleware");

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

router.get("/popular-recipes", asyncWrapper(popularRecipesController));

router.get("/ingredients", asyncWrapper(searchByIngredients));

router.get("/favorite", protectPath, asyncWrapper(getAllFavoriteController));

router.patch(
  "/favotite/:id",
  protectPath,
  asyncWrapper(addToFavoriteController)
);

router.patch(
  "/favorite/:id",
  protectPath,
  asyncWrapper(removeFromFavoriteController)
);

module.exports = { recipesRouter: router };
