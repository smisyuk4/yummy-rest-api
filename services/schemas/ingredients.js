const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema(
  {
    ttl: {
      type: String,
      trim: true,
      require: [true, 'Set title of ingredient'],
    },
    desc: {
      type: String,
      trim: true,
    },
    t: {
      type: String,
      trim: true,
    },
    thb: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = {
  Ingredients,
};
