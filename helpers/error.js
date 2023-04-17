class ContactBaseError extends Error {
    constructor(message){
        super(message)
        this.status = 400;
    }
}

// class ValidationError extends ContactBaseError {
//     constructor(message){
//         super(message)
//         this.status = 400;
//     }
// }

class WrongParametersError extends ContactBaseError {
    constructor(message){
        super(message)
        this.status = 404;
    }
}

// class ConflictError extends ContactBaseError {
//     constructor(message){
//         super(message)
//         this.status = 409;
//     }
// }

// class NotAuthorizedError extends ContactBaseError {
//     constructor(message){
//         super(message)
//         this.status = 401;
//     }
// }

module.exports = {
    ContactBaseError,
    // ValidationError,
    WrongParametersError,
    // ConflictError,
    // NotAuthorizedError,
}