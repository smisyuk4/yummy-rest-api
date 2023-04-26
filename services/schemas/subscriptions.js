const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    idUser: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Subscription = model('subscription', subscriptionSchema);

module.exports = {
  Subscription,
};
