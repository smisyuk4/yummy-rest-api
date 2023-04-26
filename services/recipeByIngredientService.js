const { normalize } = require('path');
const { HttpError } = require('../helpers/HttpError');
const { Ingredients } = require('./schemas/ingredients');
const { OwnRecipes } = require('./schemas/ownRecipes');
const { Recipes } = require('./schemas/recipes');

const getAllRecipesByIngredient = async (request, owner, pagination) => {
  let normalizedRequest = '';
  const trimRequest = request.trim();
  if (request !== undefined) {
    normalizedRequest =
      trimRequest.charAt(0).toUpperCase() + trimRequest.slice(1).toLowerCase();
  }
  const searchedIngredient = await Ingredients.findOne({
    ttl: `${normalizedRequest}`,
  });

  if (!searchedIngredient) {
    throw HttpError(
      404,
      `Failure! There is no ingredient found with name: ${request.ingredient}`
    );
  }
  const userRecipecByIngredients = await OwnRecipes.find(
    {
      $and: [
        { owner },
        {
          ingredients: {
            $elemMatch: { id: searchedIngredient._id.toString() },
          },
        },
      ],
    },
    '',
    pagination
  );

  const AlluserRecipecByIngredients = await OwnRecipes.find({
    $and: [
      { owner },
      {
        ingredients: {
          $elemMatch: { id: searchedIngredient._id.toString() },
        },
      },
    ],
  });

  const baseRecipesByIngredients = await Recipes.find(
    {
      ingredients: { $elemMatch: { id: searchedIngredient._id } },
    },
    '',
    pagination
  );

  const AllbaseRecipesByIngredients = await Recipes.find({
    ingredients: { $elemMatch: { id: searchedIngredient._id } },
  });

  const globalRecipes = {
    countRecipesBase: baseRecipesByIngredients?.length,
    AllcountRecipesBase: AllbaseRecipesByIngredients?.length,

    coutnRecipesMy: userRecipecByIngredients?.length,
    AllcoutnRecipesMy: AlluserRecipecByIngredients?.length,

    totalRecipes: [...userRecipecByIngredients, ...baseRecipesByIngredients],
  };
  return globalRecipes;
};

module.exports = {
  getAllRecipesByIngredient,
};
