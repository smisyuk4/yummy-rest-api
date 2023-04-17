const {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getRecipesMain,
} = require("../services/recipesServices");
const { Recipes } = require("../services/schemas/recipes");
const { getAllIngredients } = require("../services/ingredientsServices");

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
  const { title, page = 1, limit = 10 } = req.query;
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

const searchByIngredients = async (req, res) => {
  const { ttl, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const condition = { ttl: { $regex: ttl, $options: "i" } };
  const pagination = { skip, limit };

  console.log(condition, pagination);
  const allIngredients = await getAllIngredients(condition, pagination);

  const exampleEngredients = [
    { _id: "640c2dd963a319ea671e3746", ttl: "Potatoes" },
    { _id: "640c2dd963a319ea671e3768", ttl: "Small Potatoes" },
  ];

  console.log(allIngredients);
  const conditionSearch = {
    ingredients: { $elemMatch: { id: allIngredients[0]._id } },
  };

  console.log(conditionSearch);
  const recipesByIngredients = await getRecipes(conditionSearch, pagination);

  res.json({
    status: "Success",
    code: 200,
    data: {
      // currentPage: page,
      countRecipes: recipesByIngredients.length,
      recipes: recipesByIngredients,
    },
  });
};

const getCategoryListController = (req, res) => {
  const resultCategory = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];
  res.json({ resultCategory });
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
  searchByIngredients,
  getRecipesByIdController,
  getAllRecipesController,
  getCategoryListController,
};
