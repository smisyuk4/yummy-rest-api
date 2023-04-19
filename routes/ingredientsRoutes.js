const express = require('express');
const router = express.Router();
const {
  get,
  getAllRecipesByIngredientController,
} = require('../controllers/ingredientsController');
const { asyncWrapper } = require('../helpers/asyncWrapper');

router.get('/', asyncWrapper(get));

router.get('/global', asyncWrapper(getAllRecipesByIngredientController));

router.get('/list', asyncWrapper(get));

module.exports = { ingredientsRouter: router };
