const express = require("express");
const router = express.Router();
const { signup,
	login,
	logout,
	getUser,
	updateUserAvatar,
	updateUser,
	verify,
	reVerify } = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper')
const { protectPath } =  require('../middlewares/authMiddleware')
const { uploadCloud } = require('../middlewares/uploadMiddleware')

// user/subscribe

router.post("/register", asyncWrapper(signup));
router.post("/login", asyncWrapper(login));
router.get("/verify/:verificationToken", asyncWrapper(verify));
router.post("/verify", asyncWrapper(reVerify));
router.use(protectPath);
router.post("/logout", asyncWrapper(logout));
router.get("/current", asyncWrapper(getUser));
router.post("/update", asyncWrapper(updateUser));
router.post(
	"/avatars",
	uploadCloud.single("avatar"),
	asyncWrapper(updateUserAvatar)
);


// router.post('/register', asyncWrapper(register));
