const { User } = require('../services/schemas/users');
const { updateUser } = require('../services/userServices');
const { getIdIngredient } = require('../services/ingredientsServices');
const {
  shoppingListValidation,
} = require('../services/schemas/shoppingListValidation');
// const { Recipes } = require('../services/schemas/recipes');
const { HttpError } = require('../helpers/HttpError');
const { getUserById } = require('../services/userServices');

// add ingredient in user`s shopping list
const postIngredientShoppingList = async (req, res) => {
  const user = await User.findById(req.user._id);

  const { error } = shoppingListValidation.validate(req.body);

  if (error) {
    throw new HttpError(400, `Your may writes all fields.`);
  }
  if (!user) {
    throw new HttpError(404, `${user} not found.`);
  }

  const { ingredientId, measure, ttl, thb } = req.body;

  const newIngredient = {
    ingredientId,
    measure,
    ttl,
    thb,
  };

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $push: { shoppingList: { ...newIngredient } } },
    {
      new: true,
    }
  );
  const updatedShoppingList = updatedUser.shoppingList;

  await user.save();

  res.status(200).json({
    countIngredientsShoppingList: updatedShoppingList.length,
    updatedShoppingList,
    message: 'Ingredient added to shopping list success',
  });
};

// remove ingredient in user`s shopping list
const deleteItemShoppingList = async (req, res) => {
  const user = await User.findById(req.user._id);
  const idUser = user.id;

  if (!user) {
    throw new HttpError(404, `${user} not found.`);
  }
  const { ingredientId } = req.params;

  const arrayIngredients = user.shoppingList;

  const index = arrayIngredients.findIndex(({ _id }) =>
    _id.equals(ingredientId)
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Ingredient not found' });
  }
  arrayIngredients.splice(index, 1);

  const newUser = await updateUser(idUser, {
    shoppingList: [...arrayIngredients],
  });

  res.status(200).json({
    newUser,
    message: 'Ingredient removed from shopping list success',
  });
};

// get user`s shopping list by user id
const getShoppingList = async (req, res) => {
  const shoppingList = req.user.shoppingList;

  res
    .status(200)
    .json({ shoppingList, message: 'Shopping list of current user' });
};

module.exports = {
  postIngredientShoppingList,
  deleteItemShoppingList,
  getShoppingList,
};
