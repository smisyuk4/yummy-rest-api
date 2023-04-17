const express = require("express");
const router = express.Router();
const { get } = require("../controllers/ingredientsController");

const { asyncWrapper } = require("../helpers/asyncWrapper");
router.get("/", asyncWrapper(getPopularRecipe));

module.exports = { popularRecipeRouter: router };
