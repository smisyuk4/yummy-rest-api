const express = require('express');
const router = express.Router();

const {
  postIngredientShoppingList,
  getShoppingList,
  deleteItemShoppingList,
} = require('../controllers/shoppingListController');

const {
  get,
  getSomeIngredients,
  getAllRecipesByIngredientController,
} = require('../controllers/ingredientsController');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const {
  ingredientValidation,
} = require('../services/schemas/ingredientsValidation');

router.get('/', asyncWrapper(get));

router.post('/list', asyncWrapper(getSomeIngredients));

router.get(
  '/global',
  ingredientValidation,
  asyncWrapper(getAllRecipesByIngredientController)
);

router.get('/list', asyncWrapper(get));

router.get('/shopping-list', asyncWrapper(getShoppingList));

router.post('/shopping-list', asyncWrapper(postIngredientShoppingList));

router.delete(
  '/shopping-list/:ingredientId',
  asyncWrapper(deleteItemShoppingList)
);

module.exports = { ingredientsRouter: router };
