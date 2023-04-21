const gravatar = require("gravatar");

const {
  getAllOwnRecipes,
  getOwnRecipesById,
  addRecipe,
  deleteRecipe,
} = require("../services/ownRecipesServices");

const { HttpError } = require("../helpers/HttpError");

const get = async (req, res, next) => {
  const { _id: owner } = req.user;
  const recipes = await getAllOwnRecipes({ owner });
  res.status(200).json(recipes);
};

const getById = async (req, res, next) => {
  const recipe = await getOwnRecipesById(req.params.id);
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(recipe);
};

const create = async (req, res, next) => {
  const { _id: owner } = req.user;

  let recipeImg;

  if (req.file) {
    recipeImg = req.file.path;
  } else {
    recipeImg = "/recipeDefaultImg.png";
  }

  const recipeData = { ...req.body, imageURL: recipeImg };

  const newRecipe = await addRecipe({ ...recipeData, owner });
  res.status(201).json(newRecipe);

  // if (req.body.imageURL) {
  //   const uploadRes = await cloudinary.uploader.upload(imageURL, {
  //     upload_preset: "recipe-images",
  //   });
  //   if (uploadRes) {
  //     const recipeData = { ...req.body, imageURL: uploadRes };
  //     const newRecipe = await addRecipe({ ...recipeData, owner });
  //     res.status(201).json(newRecipe);
  //   }
  // }
};

const remove = async (req, res, next) => {
  const recipe = await deleteRecipe(req.params.id);
  if (!recipe) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Recipe deleted" });
};

module.exports = {
  get,
  getById,
  remove,
  create,
};
