const { User } = require('./schemas/users')

const createUser = ({ email, password }) => {
    return User.create({ email, password })
}
const findUser = ({ email }) => {
    return User.findOne({ email })
}

const updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, data, {new: true})
}
module.exports = {
    createUser,
    findUser,
    updateUser
}