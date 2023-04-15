const express = require('express');
const router = express.Router();
const { register} = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper')
// const { authMiddleware } =  require('../middlewares/authMiddleware')
// const { upload } = require('../middlewares/uploadMiddleware')

// user/register
// user/login
// user/logout
// user/current
// user/subscribe


router.post('/register', asyncWrapper(register));

module.exports = { userRouter: router };