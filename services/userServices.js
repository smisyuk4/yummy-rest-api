const {User} = require("./schemas/users");

const createUser = ({ email, password }) => {
    return User.create({ email, password })
}
const getUserById = id => {
	return User.findById(id);
};
const getUserByFild = find => {
	return User.findOne(find);
};
const updateUser = (id, body) => {
    return User.findByIdAndUpdate(id, body, {new: true})
}
module.exports = {
    createUser,
    getUserByFild,
    getUserById,
    updateUser
}