const express = require('express');
const router = express.Router();
const { get, getAllRecipesByIngredientController } = require('../controllers/ingredientsController');

const { asyncWrapper } = require('../helpers/asyncWrapper')
// const { authMiddleware } =  require('../middlewares/authMiddleware')
// const { upload } = require('../middlewares/uploadMiddleware')
const { postIngredientShoppingList, getShoppingList, deleteItemShoppingList } = require('../controllers/shoppingListController');

// ingredients
// ingredients/list
// ingredients/shopping-list

router.get('/', asyncWrapper(get));
router.get('/global', asyncWrapper(getAllRecipesByIngredientController))

router.get('/list', asyncWrapper(get));

// ==== SHOPPING LIST ======
// add ingredient to shopping-list
router.post('/shopping-list', postIngredientShoppingList);

// delete ingredient from shopping list
router.delete('/shopping-list/:id', deleteItemShoppingList)

// get user`s shopping list
router.get('/shopping-list/:userId', getShoppingList);

module.exports = { ingredientsRouter: router };