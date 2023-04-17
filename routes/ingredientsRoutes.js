const express = require('express');
const router = express.Router();
const { get, getAllRecipesByIngredientController } = require('../controllers/ingredientsController');

const { asyncWrapper } = require('../helpers/asyncWrapper')
// const { authMiddleware } =  require('../middlewares/authMiddleware')
// const { upload } = require('../middlewares/uploadMiddleware')

// ingredients
// ingredients/list
// ingredients/shopping-list

router.get('/', asyncWrapper(get));
router.get('/global', asyncWrapper(getAllRecipesByIngredientController))

router.get('/list', asyncWrapper(get));

module.exports = { ingredientsRouter: router };