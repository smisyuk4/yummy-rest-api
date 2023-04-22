const { OwnRecipes } = require("./schemas/ownRecipes");

const getAllOwnRecipes = async (owner) => {
  return OwnRecipes.find(owner);
};

const getAllOwnRecipesWithPagination = async (owner, pagination) => {
  return OwnRecipes.find(owner, "", pagination);
};

const getOwnRecipesById = (id) => {
  return OwnRecipes.findOne({ _id: id });
};

const addRecipe = (body) => {
  return OwnRecipes.create(body);
};

const deleteRecipe = (id) => {
  return OwnRecipes.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllOwnRecipes,
  getAllOwnRecipesWithPagination,
  getOwnRecipesById,
  deleteRecipe,
  addRecipe,
};
