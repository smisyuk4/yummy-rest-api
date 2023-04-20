const express = require('express');

const router = express.Router();
const {
  signup,
  login,
  logout,
  getUser,
  updateUserAvatar,
  updateUser,
  verify,
  reVerify,
} = require('../controllers/userController');
const { subscribe } = require('../controllers/subscribeController');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { protectPath } = require('../middlewares/authMiddleware');
const { uploadCloud } = require('../middlewares/uploadMiddleware');
const { deleteItemShoppingList } = require('../controllers/shoppingListController');

router.post('/subscribe', asyncWrapper(subscribe));

router.post('/register', asyncWrapper(signup));
router.post('/login', asyncWrapper(login));
router.get('/verify/:verificationToken', asyncWrapper(verify));
router.post('/verify', asyncWrapper(reVerify));
router.use(protectPath);
router.post('/logout', asyncWrapper(logout));
router.get('/current', asyncWrapper(getUser));
router.patch('/update', asyncWrapper(updateUser));
router.post(
  '/avatars',
  uploadCloud.single('avatar'),
  asyncWrapper(updateUserAvatar)
);
router.post('/subscribe', asyncWrapper(subscribe));

module.exports = { userRouter: router };
