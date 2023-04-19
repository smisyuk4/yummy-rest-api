const express = require('express');
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
} = require('../controllers/recipesController');

const { asyncWrapper } = require('../helpers/asyncWrapper');

router.get('/', asyncWrapper(get));

router.get('/category-list', getCategoryListController);

router.get('/main-page', asyncWrapper(getAllRecipesController));

router.get('/category/:category', asyncWrapper(getCategoryController));

router.get('/search', asyncWrapper(searchByTitle));

router.get("/popular-recipes", asyncWrapper(popularRecipesController));

router.get('/ingredients', asyncWrapper(searchByIngredients));

router.get('/favorite', asyncWrapper(getAllFavoriteController));

router.patch('/favorite/:id', asyncWrapper(addToFavoriteController));

router.delete('/favorite/:id', asyncWrapper(removeFromFavoriteController));

router.get('/:id', asyncWrapper(getRecipesByIdController));

module.exports = { recipesRouter: router };
