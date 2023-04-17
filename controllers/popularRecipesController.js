const { getAllRecipes } = require("../services/recipesServices");
const { Recipes } = require("../services/schemas/recipes");

const popularRecipes = async (req, res) => {
  const mostPopular = Recipes.sort((a, b) => b.favorite - a.favorite);

  res.json({
    status: "Success",
    code: 200,
    data: {
      mostPopular,
    },
  });
};
module.exports = { popularRecipes };
