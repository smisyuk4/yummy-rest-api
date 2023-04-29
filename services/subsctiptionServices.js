const { Subscription } = require('../services/schemas/subscriptions');

const createSubscription = ({ email, idUser }) => {
  return Subscription.create({ email, idUser });
};
const findIsUserSubscribe = (email) => {
  return Subscription.findOne(email)
}
module.exports = {
  createSubscription,
  findIsUserSubscribe
};
