const {
  getAllIngredients,

} = require("../services/ingredientsServices");
const { getAllRecipesByIngredient } = require("../services/recipeByIngredientService");

const get = async (req, res) => {
  const condition = {};

  const results = await getAllIngredients(condition);

  res.json({
    status: "Success",
    code: 200,
    data: {
      ingretients: results,
    },
  });
};

const getAllRecipesByIngredientController = async (req, res) => {
  const { _id } = req.user;
  const results = await getAllRecipesByIngredient(req.body, _id);

  res.json({
    status: "Success",
    code: 200,
    data: {
      ingretients: results,
    },
  });
};

module.exports = {
  get,
  getAllRecipesByIngredientController,
};
