import {User} from '../services/schemas/users'

const subscribe = async (req, res, next) => {
    try {

        const {email} = req.body
        const user = await User.findOne({email})
        if(email != user.email) {
            throw new Error
        }
        const letter = {
            to: email,
            subject: "You have subscribed successful",
        }

        // await sendEmail(letter)

        res.status(200).json({
            massage: "Subscription letter send"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = subscribe