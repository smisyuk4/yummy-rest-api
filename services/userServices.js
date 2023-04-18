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
const getUserByFild = find => {
  return User.findOne(find);
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserByFild,
};
