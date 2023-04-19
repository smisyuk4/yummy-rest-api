const mongoose = require("mongoose");

const handleMongooseError = require("../../helpers/handleMongooseError");

const { getAllIngredients } = require("../ingredientsServices");

const ingredients = getAllIngredients();

const Schema = mongoose.Schema;

const ownRecipesSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      require: [true, "Set title of recipe"],
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      require: [true, "Select category"],
      enum: [
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
      ],
    },
    time: {
      type: String,
      trim: true,
      require: [true, "Set cooking time"],
    },
    ingredients: {
      type: Array,
      of: new Schema({
        item: String,
        quantity: String,
      }),
      require: [true, "Add at least one ingredient"],
    },
    instructions: {
      type: String,
      trim: true,
      require: [
        true,
        "Write step-by-step instructions for preparing the recipe",
      ],
    },
    imageURL: {
      type: String,
      required: [true, "Image is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

ownRecipesSchema.post("save", handleMongooseError);

const OwnRecipes = mongoose.model("OwnRecipes", ownRecipesSchema);

module.exports = {
  OwnRecipes,
};
