const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      enum: [
        'Beef',
        'Breakfast',
        'Chicken',
        'Dessert',
        'Goat',
        'Lamb',
        'Miscellaneous',
        'Pasta',
        'Pork',
        'Seafood',
        'Side',
        'Starter',
        'Vegan',
        'Vegetarian',
      ],
    },
    area: {
      type: String,
      trim: true,
    },
    instructions: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumb: {
      type: String,
      trim: true,
    },
    preview: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
    tags: {
      type: Array,
    },
    ingredients: {
      type: Array,
    },
    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipes = mongoose.model('Recipes', recipesSchema);

module.exports = {
  Recipes,
};
