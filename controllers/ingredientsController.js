const { getAllIngredients } = require('../services/ingredientsServices');
const {
  getAllRecipesByIngredient,
} = require('../services/recipeByIngredientService');

const get = async (req, res) => {
  const condition = {};

  const results = await getAllIngredients(condition);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      totalIngretients: results.length,
      ingretients: results,
    },
  });
};

const getSomeIngredients = async (req, res) => {
  const { arrayId } = req.body;

  const condition = { _id: { $in: arrayId } };

  const results = await getAllIngredients(condition);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      totalIngretients: results.length,
      ingretients: results,
    },
  });
};

const getAllRecipesByIngredientController = async (req, res) => {
  const { ingredient, page = 1, limit = 10 } = req.query;
  const { _id } = req.user;

  const skip = (page - 1) * limit;

  const pagination = { skip, limit };

  console.log(ingredient);
  const results = await getAllRecipesByIngredient(ingredient, _id, pagination);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      currentPage: page,
      countRecipes: limit,
      totalRecipes: results.totalRecipes.length,

      countRecipesBase: results.countRecipesBase,
      AllcountRecipesBase: results.AllcountRecipesBase,
      coutnRecipesMy: results.coutnRecipesMy,
      AllcoutnRecipesMy: results.AllcoutnRecipesMy,
      recipes: results.totalRecipes,
    },
  });
};

module.exports = {
  get,
  getSomeIngredients,
  getAllRecipesByIngredientController,
};
