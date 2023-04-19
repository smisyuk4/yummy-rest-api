const { User } = require('../services/schemas/users');
const { Ingredients } = require('../services/schemas/ingredients');

const { asyncWrapper } = require('../helpers/asyncWrapper');

// add ingredient in user`s shopping list
// router.post('/shopping-list/add', postShoppingList)
const postIngredientShoppingList = asyncWrapper(async (req, res) => {
    // id user by token
    const { _id } = req.user;
   
    const ingredient = req.body; 

    const { ttl, thb } = await Ingredients.findById(ingredient.ingredientId); 

    const addIngredients = await User.findByIdAndUpdate(
      _id,
      { $push: { shoppingList: { ...ingredient, ttl, thb } } },
      { new: true }
    );
    res.status(200).json(addIngredients);
});

// remove ingredient in user`s shopping list
// router.delete('/shopping-list/:id', deleteItemShoppingList)
const deleteItemShoppingList = asyncWrapper(async (req, res) => {
    // id user by token
  const { _id } = req.user;
   // id ingredient  
  const { id } = req.params; 
  
  const user = await User.findByIdAndUpdate(
  _id,
  { $pull: { shoppingList: { _id: id } } },
  { new: true }
);
if (!user) return res.status(404).json({ msg: 'User not found' });
res.status(200).json(user);
});

// get user`s shopping list by user id
// router.get('/:userId/shopping-list', getShoppingList)
const getShoppingList = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  const userShoppingList = user.shoppingList;

  res.json({ userShoppingList });
});

module.exports = {
  postIngredientShoppingList,
  deleteItemShoppingList,
  getShoppingList,
}