const { User } = require('../services/schemas/users');
const {updateUser} = require('../services/userServices')
const { getIdIngredient } = require('../services/ingredientsServices');
const { shoppingListValidation } = require('../services/schemas/shoppingListValidation');
// const { Recipes } = require('../services/schemas/recipes');
const { HttpError } = require('../helpers/HttpError');

// add ingredient in user`s shopping list
const postIngredientShoppingList = async (req, res) => {
  const user = await User.findById(req.user._id);
 
  const {error} = shoppingListValidation.validate(req.body);

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

    const addIngredients = await User.findByIdAndUpdate(
      user._id,
      { $push: { shoppingList: { ...newIngredient } } },
      {
        new: true,
      })
       
    await user.save();

    res.status(200).json({ addIngredients, message: "Ingredient added to shopping list" });
};

// remove ingredient in user`s shopping list
const deleteItemShoppingList = async (req, res) => {
  const user = await User.findById(req.user._id);


  if (!user) {
    throw new HttpError(404, `${user} not found.`);
  };
  const ingredientIdParams = req.params.ingredientId;
  // console.log(`ingredientId ${ingredientIdParams}`);

  const arrayIngredients = user.shoppingList;
  console.log(`arrayIngredients ${arrayIngredients}`);
  
  const findIngredient = arrayIngredients.filter((it) => it.ingredientId === ingredientIdParams);
  console.log(findIngredient);

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

  if (!user) {
    throw new HttpError(404, `${user} not found.`);
  }

  const userShoppingList = user.shoppingList;

  res.json({ userShoppingList });
};

module.exports = {
  postIngredientShoppingList,
  deleteItemShoppingList,
  getShoppingList,
}