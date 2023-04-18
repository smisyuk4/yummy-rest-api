const { Subscription } = require('../services/schemas/subscriptions');

const createSubscription = ({ email, idUser }) => {
    return Subscription.create({ email, idUser })
}

module.exports = {
    createSubscription,
}