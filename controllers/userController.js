const { createUser } = require('../services/userServices');
// const {
//   userValidSchema,
//   userVerifyEmail,
// } = require('../service/schemas/userValidSchema');
// const {
//   ValidationError,
//   ConflictError,
//   NotAuthorizedError,
//   WrongParametersError,
// } = require('../helpers/error');


const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await createUser({
      email,
      password,
    });

    res.status(201).json({
      Status: 'created',
      Code: 201,
      ResponseBody: {
        user: {
          email: result.email,
        },
      },
    });
  } catch (error) {
    // throw new ConflictError(error.message);
  }
};


module.exports = {
  register,
};
