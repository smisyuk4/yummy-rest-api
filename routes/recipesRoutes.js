const express = require('express');
const router = express.Router();
const { get, search, searchByTitle, getRecipesByIdController, getAllRecipesController } = require('../controllers/recipesController');

const { asyncWrapper } = require('../helpers/asyncWrapper')
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

// router.get('/', asyncWrapper(get));


router.get('/main-page', asyncWrapper(getAllRecipesController));

router.get('/:id', asyncWrapper(getRecipesByIdController));

router.get('/search', asyncWrapper(searchByTitle));


module.exports = { recipesRouter: router };