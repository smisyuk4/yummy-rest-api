const { getAllRecipes, getRecipes } = require('../services/recipesServices');

// const { contactValidSchema } = require('../service/schemas/contactValidSchema');
// const { ValidationError } = require('../helpers/error');

const get = async (req, res) => {
  const condition = {};

  const results = await getAllRecipes(condition);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      ingretients: results,
    },
  });
};

const search = async (req, res) => {
  const { title, ingredients, page = 1, limit = 10 } = req.query;
  console.log(req.query);

  // pagination and filter
  const skip = (page - 1) * limit;

  const condition = title
    ? { title: { $regex: title, $options: 'i' } }
    : { ingredients: { $regex: ingredients, $options: 'i' } };
  const pagination = { skip, limit };

  console.log(condition, pagination);
  const results = await getRecipes(condition, pagination);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      recipes: results,
    },
  });
};

module.exports = {
  get,
  search,
};
