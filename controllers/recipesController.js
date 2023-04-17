
const { getAllRecipes, getRecipes, getRecipesById, getRecipesMain } = require('../services/recipesServices');
const { Recipes} = require('../services/schemas/recipes');

// const { contactValidSchema } = require('../service/schemas/contactValidSchema');
// const { ValidationError } = require('../helpers/error');

const get = async (req, res) => {
  const condition = {};

  const results = await getAllRecipes(condition);

  res.json({
    status: "Success",
    code: 200,
    data: {
      ingretients: results,
    },
  });
};

const searchByTitle = async (req, res) => {
  const { title, ingredients, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const condition = { title: { $regex: title, $options: "i" } };
  const pagination = { skip, limit };

  console.log(condition, pagination);
  const results = await getRecipes(condition, pagination);

  res.json({
    status: "Success",
    code: 200,
    data: {
      currentPage: page,
      countRecipes: results.length,
      recipes: results,
    },
  });
};

const getRecipesByIdController = async (req, res) => {
  const id = req.params.id;
  const result = await getRecipesById(id);
  res.json({ result });
};



const getAllRecipesController = async (req, res, next) => {
    const recipes = await Recipes.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: recipes,
      },
    });

};

module.exports = {
  get,
  searchByTitle,
  getRecipesByIdController,
  getAllRecipesController,
};
