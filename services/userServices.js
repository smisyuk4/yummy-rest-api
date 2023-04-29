const { User } = require('./schemas/users');

const createUser = newContact => {
  return User.create(newContact);
};

const updateUser = (id, fields) => {
  return User.findByIdAndUpdate({ _id: id }, fields, { new: true });
};
const getUserById = id => {
  return User.findById(id);
};
const getUserUpdate = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true });
};
const getUserByFild = find => {
  return User.findOne(find);
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserByFild,
  getUserUpdate,
};
