const {User} = require("./schemas/users");

const createUser = ({ email, password }) => {
    return User.create({ email, password })
}

module.exports = {
    createUser,
}