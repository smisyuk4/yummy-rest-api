const messages = {
    400: "Bad Request",
    404: "Not found",
    401: "Not authorized",
    204: "No Content",
}

function HttpError (status, message = messages[status]) {
 const error = new Error(message)
 error.status = status
 return error
}

module.exports = HttpError