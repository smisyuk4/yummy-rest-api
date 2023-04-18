const {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getRecipesMain,
  getPopularRecipes,
  getCategory,
  getAllCategoryWithFourRecipes,
  addToFavorite,
  removeFromFavorite,
  getAllFavorite,
} = require("../services/recipesServices");
const { Recipes } = require("../services/schemas/recipes");
const { getAllIngredients } = require("../services/ingredientsServices");

// const { contactValidSchema } = require('../service/schemas/contactValidSchema');
// const { ValidationError } = require('../helpers/error');
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
  res.json({ resultCategory });
};

const getRecipesByIdController = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await getRecipesById(id);
  res.json({ result });
};

//! Запрос возвращает все рецепты (ниже переделал по другому - все категории по 4 рецепта )
// const getAllRecipesController = async (req, res, next) => {
//   const recipes = await Recipes.find({});
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result: recipes,
//     },
//   });
// };
const getAllRecipesController = async (req, res, next) => {
  const limit = 4;

  const resultAllCategory = await getAllCategoryWithFourRecipes(
    resultCategory,
    { limit }
  );
  res.json({ resultAllCategory });
};

const getCategoryController = async (req, res, next) => {
  const category = req.params.category;

  const { page = 1, limit = 8 } = req.query;
  const skip = (+page - 1) * +limit;

  const resultCategory = await getCategory(category, { skip, limit });
  res.json({ resultCategory });

  const recipes = await Recipes.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: recipes,
    },
  });
};

const popularRecipesController = async (req, res) => {
  const favoriteRecipes = await getAllRecipes({
    favorite: { $exists: true },
    $where: "this.favorite.length>1",
  });

  const result = getPopularRecipes(favoriteRecipes);

  console.log(favoriteRecipes);

  res.json({
    status: "Success",
    code: 200,
    data: {
      result,
    },
  });
};

const addToFavoriteController = async (req, res) => {
  await addToFavorite(req.params.id, req.user._id);
  res.json({ message: "success" });
};

const removeFromFavoriteController = async (req, res) => {
  await removeFromFavorite(req.params.id, req.user._id);
  res.json({ message: "success" });
};

const getAllFavoriteController = async (req, res) => {
  const allFavorite = await getAllFavorite(req.user._id);
  res.json({ allFavorite });
};

module.exports = {
  get,
  searchByTitle,
  searchByIngredients,
  getRecipesByIdController,
  getAllRecipesController,
  getCategoryListController,
  getCategoryController,
  popularRecipesController,
  addToFavoriteController,
  removeFromFavoriteController,
  getAllFavoriteController,
};
