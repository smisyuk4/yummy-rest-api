const { OwnRecipes } = require("./schemas/ownRecipes");

const getAllOwnRecipes = async (owner) => {
  return OwnRecipes.find(owner);
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
  getOwnRecipesById,
  deleteRecipe,
  addRecipe,
};
