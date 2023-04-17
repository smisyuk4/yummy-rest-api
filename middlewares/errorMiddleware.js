// const { ContactBaseError } = require('../helpers/error')

// const errorMiddleware = (error, req, res, next) => {
//     if (error instanceof ContactBaseError) {
//         return res.status(error.status).json({
//             message: error.message,
//         })
//     }

//     res.status(500).json({message: error.message})
// }

// module.exports = {
//     errorMiddleware
// }