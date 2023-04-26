const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const {
  createUser,
  getUserByFild,
  getUserById,
  getUserUpdate,
} = require('../services/userServices');
const { userValidation } = require('../services/schemas/userValidation');
// const {sendEmailToken} = require("../services/emailService");

// Sign jwt helper function
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 *@param {Object} req
 *@param {Object} res
 * @description Signup controller
 */
const signup = async (req, res) => {
  const newUserData = {
    ...req.body,
    avatarURL: gravatar.url(req.body.email, {
      protocol: 'https',
      s: '250',
    }),
  };
  const { error, value } = userValidation(newUserData, [
    'password',
    'email',
    'name',
    'avatarURL',
  ]);
  if (error) return res.status(400).json({ message: error.message });
  value.verificationToken = v4();
  const isExist = await getUserByFild({ email: value.email });
  if (isExist) return res.status(409).json({ message: 'Email in use' });
  const newUser = await createUser(value);

  const token = signToken(newUser.id);
  newUser.token = token;
  newUser.save();

  // sendEmailToken(newUser.email, newUser.verificationToken);

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
      registeredAt: newUser.createdAt,
    },
    token,
  });
};

/**
 *@param {Object} req
 *@param {Object} res
 * @description Login controller
 */
const login = async (req, res) => {
  const { error, value } = userValidation(req.body, ['password', 'email']);
  if (error) return res.status(400).json({ message: error.message });
  const { email, password } = value;

  const user = await getUserByFild({ email }).select('+password');

  if (!user)
    return res.status(401).json({ message: 'Email or password is wrong' });

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid)
    return res.status(401).json({ message: 'Email or password is wrong' });

  // if (!user.verify)
  // 	return res
  // 		.status(400)
  // 		.json({message: "Verification has not been passed"});

  const token = signToken(user.id);
  user.token = token;
  user.save();
  res.json({
    user: {
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      registeredAt: user.createdAt,
    },
    token,
  });
};

/**
 *@param {Object} req
 *@param {Object} res
 * @description Logout controller
 */
const logout = async (req, res) => {
  const { user: _id } = req;

  const user = await getUserById(_id).select('+token');

  if (!user) return res.status(401).json({ message: 'Not authorized' });

  user.token = null;
  await user.save();

  res.status(204).json({
    message: 'User logout successfully',
  });
};

/**
 *@param {Object} req
 *@param {Object} res
 * @description Current user controller
 */
const getUser = async (req, res) => {
  const { user: _id } = req;

  const user = await getUserById(_id);

  if (!user) return res.status(401).json({ message: 'Not authorized' });

  res.json({
    email: user.email,
    name: user.name,
    avatarURL: user.avatarURL,
    registeredAt: user.createdAt,
  });
};

/**
 *@param {Object} req
 *@param {Object} res
 * @description Avatar upload controller
 */
const updateUserAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  let user = await getUserById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.avatarURL = req.file.path;
  await user.save();
  res.status(201).json({
    avatarURL: user.avatarURL,
  });
};
/**
 *@param {Object} req
 *@param {Object} res
 *@description Update subscription controller
 */
const updateUser = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: 'missing fields for update' });
  const { error, value } = userValidation(req.body);
  if (error) return res.status(400).json({ message: error.message });
  await getUserUpdate(req.user._id, value);
  const user2 = await getUserById(req.user._id);
  if (!user2) return res.status(404).json({ message: 'User not found' });
  res.status(202).json({
    email: user2.email,
    name: user2.name,
    avatarURL: user2.avatarURL,
    registeredAt: user2.createdAt,
  });
};

const verify = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await getUserByFild({ verificationToken });

  if (!user) return res.status(404).json({ message: 'Not found' });
  user.verificationToken = null;
  user.verify = true;
  await user.save();

  res.json({
    message: 'Verification successful',
  });
};
const reVerify = async (req, res) => {
  const { error, value } = userValidation(req.body, ['email']);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { email } = value;
  const user = await getUserByFild({ email });

  if (!user) return res.status(404).json({ message: 'Not found' });
  if (user.verify) {
    return res
      .status(400)
      .json({ message: 'Verification has already been passed' });
  }
  if (!user.verificationToken) {
    user.verificationToken = v4();
    user.save();
  }
  // sendEmailToken(email, user.verificationToken);

  res.json({
    message: 'Verification link resent',
  });
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserAvatar,
  updateUser,
  verify,
  reVerify,
};
