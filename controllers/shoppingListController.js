const { User } = require('../services/schemas/users');
const {updateUser} = require('../services/userServices')
// const { Ingredients } = require('../services/schemas/ingredients');
const { getIdIngredient } = require('../services/ingredientsServices')
// const { Recipes } = require('../services/schemas/recipes');
// const { HttpError } = require('../helpers/HttpError');

// add ingredient in user`s shopping list
const postIngredientShoppingList = async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const shoppingList = req.body.shoppingList;
    // console.log(shoppingList)

    const { ingredientId, measure, ttl, thb } = req.body;

    const newIngredient = {
      ingredientId,
      measure,
      ttl,
      thb,
    };

    user.shoppingList.push(newIngredient);
    await user.save();

    res.status(200).json({ message: "Ingredient added to shopping list" });
};

// remove ingredient in user`s shopping list
const deleteItemShoppingList = async (req, res) => {
  
  const user = await User.findById(req.user._id);
  // console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const ingredientIdParams = req.params.ingredientId;
  // console.log(ingredientId);

  const arrayIngredients = user.ingredients;
  
  const findIngredient = arrayIngredients.filter((it) => it.ingredientId === ingredientIdParams);
  // console.log(findIngredient);

  const index = arrayIngredients.findIndex(findIngredient);
  // console.log(index)
  if(index === -1) {
    return res.status(404).json({ message: "Ingredient not found" })
  }
  const newArrayIngr = arrayIngredients.splice(index, 1);
  // console.log(newArrayIngr)
  const newUser = await updateUser({id: user.id, shoppingList: newArrayIngr });
  // console.log(newUser)
  
  res.status(200).json({ newUser, message: "Ingredient removed from shopping list" });
};

// get user`s shopping list by user id
const getShoppingList = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  const userShoppingList = user.shoppingList;

  res.json({ userShoppingList });
};

module.exports = {
  postIngredientShoppingList,
  deleteItemShoppingList,
  getShoppingList,
}