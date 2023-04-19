const {
  getAllIngredients,
  getAllRecipesByIngredient,
} = require('../services/ingredientsServices');

// const { contactValidSchema } = require('../service/schemas/contactValidSchema');

const get = async (req, res) => {
  const condition = {};

  const results = await getAllIngredients(condition);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      ingretients: results,
    },
  });
};

const getAllRecipesByIngredientController = async (req, res) => {
  const { _id } = req.user;
  const results = await getAllRecipesByIngredient(req.body, _id);

  // const { contactValidSchema } = require('../service/schemas/contactValidSchema');

  const get = async (req, res) => {
    const results = await getAllIngredients();

    res.json({
      status: 'Success',
      code: 200,
      data: {
        ingretients: results,
      },
    });
  };
};

module.exports = {
  get,
  getAllRecipesByIngredientController,
};
