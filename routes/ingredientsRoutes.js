const express = require('express');
const router = express.Router();
const { get } = require('../controllers/ingredientsController');

const { asyncWrapper } = require('../helpers/asyncWrapper')
// const { authMiddleware } =  require('../middlewares/authMiddleware')
// const { upload } = require('../middlewares/uploadMiddleware')

// ingredients
// ingredients/list
// ingredients/shopping-list

router.get('/list', asyncWrapper(get));

module.exports = { ingredientsRouter: router };