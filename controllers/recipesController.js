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

const searchByTitle = async (req, res) => {
  const { title, ingredients, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const condition = { title: { $regex: title, $options: 'i' } };
  const pagination = { skip, limit };

  console.log(condition, pagination);
  const results = await getRecipes(condition, pagination);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      currentPage: page,
      countRecipes: results.length,
      recipes: results,
    },
  });
};

module.exports = {
  get,
  searchByTitle,
};
