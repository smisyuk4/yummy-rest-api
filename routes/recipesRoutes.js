const express = require('express');
const router = express.Router();
const { get } = require('../controllers/recipesController');

const { asyncWrapper } = require('../helpers/asyncWrapper')
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

router.get('/', asyncWrapper(get));

module.exports = { recipesRouter: router };