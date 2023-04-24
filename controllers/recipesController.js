const {
  getAllRecipes,
  getRecipes,
  getRecipesById,
  getCategory,
  getAllCategoryWithFourRecipes,
  addToFavorite,
  removeFromFavorite,
  getAllFavorite,
  getAllFavoritePagination,
} = require('../services/recipesServices');
const { Recipes } = require('../services/schemas/recipes');
const { getAllIngredients } = require('../services/ingredientsServices');
const { HttpError } = require('../helpers/HttpError');

const resultCategory = [
  'Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
];

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
  const { title, page = 1, limit = 10 } = req.query;

  if (title === '') {
    throw new HttpError(400, `Empty search fild`);
  }

  const skip = (page - 1) * limit;
  const condition = { title: { $regex: title, $options: 'i' } };
  const pagination = { skip, limit };
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

const searchByIngredients = async (req, res) => {
  const { ttl, page = 1, limit = 10 } = req.query;

  if (ttl === '') {
    throw new HttpError(400, `Empty search fild`);
  }

  const skip = (page - 1) * limit;
  const condition = { ttl: { $regex: ttl, $options: 'i' } };
  const pagination = { skip, limit };

  const allIngredients = await getAllIngredients(condition, pagination);

  if (allIngredients.length === 0) {
    throw new HttpError(404, `Ingredients ${ttl} not found`);
  }

  const ingredientsIdArr = allIngredients.map(({ _id }) => {
    return { id: _id };
  });

  const conditionSearch = {
    ingredients: {
      $elemMatch: {
        $or: ingredientsIdArr,
      },
    },
  };

  const recipesByIngredients = await getRecipes(conditionSearch, pagination);

  res.json({
    status: 'Success',
    code: 200,
    data: {
      currentPage: page,
      countRecipes: recipesByIngredients.length,
      recipes: recipesByIngredients,
    },
  });
};

const getCategoryListController = (req, res) => {
  if (!resultCategory) {
    throw new HttpError(404, `Categories ${category} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      resultCategory,
    },
  });
};

const getRecipesByIdController = async (req, res) => {
  const id = req.params.id;
  const result = await getRecipesById(id);
  res.json({ result });
};

const getAllRecipesController = async (req, res, next) => {
  const limit = 4;

  const resultAllCategory = await getAllCategoryWithFourRecipes(resultCategory, { limit });
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
    status: 'success',
    code: 200,
    data: {
      result: recipes,
    },
  });
};

const popularRecipesController = async (req, res) => {
  const recipesByPopular = await Recipes.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        preview: 1,
        arrayLength: { $size: '$favorite' },
        numberOfFavorites: {
          $cond: {
            if: { $isArray: '$favorites' },
            then: { $size: '$favorites' },
            else: 'NA',
          },
        },
      },
    },
    { $sort: { arrayLength: -1 } },
    { $limit: 4 },
  ]);
  if (!recipesByPopular) {
    throw new HttpError(404, `Popular recipes not found`);
  }
  res.json({
    status: 'Success',
    code: 200,
    data: {
      countRecipes: recipesByPopular.length,
      recipesByPopular,
    },
  });
};

const addToFavoriteController = async (req, res) => {
  await addToFavorite(req.params.id, req.user._id);
  res.json({ message: 'success' });
};

const removeFromFavoriteController = async (req, res) => {
  await removeFromFavorite(req.params.id, req.user._id);
  res.json({ message: 'success' });
};

const getAllFavoriteController = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const pagination = { skip, limit };
  const allFavorite = await getAllFavoritePagination(req.user._id, pagination);
  const all = await getAllFavorite(req.user._id);
  res.json({
    status: 'Success',
    code: 200,
    data: {
      currentPage: page,
      countRecipes: all.length,
      recipes: allFavorite,
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
  getCategoryController,
  popularRecipesController,
  addToFavoriteController,
  removeFromFavoriteController,
  getAllFavoriteController,
};
