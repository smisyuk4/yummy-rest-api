const express = require("express");
const router = express.Router();

const {
  get,
  create,
  getById,
  remove,
} = require("../controllers/ownRecipesController");
const { newRecipeSchema } = require("../services/schemas/ownRecipeValidation");
const validateBody = require("../helpers/validation");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { uploadCloud } = require("../middlewares/uploadMiddleware");

router
  .route("/")
  .get(asyncWrapper(get))
  .post(
    uploadCloud.single("imageURL"),
    validateBody(newRecipeSchema),
    asyncWrapper(create)
  );

router.route("/:id").get(asyncWrapper(getById)).delete(asyncWrapper(remove));

module.exports = { ownRecipesRouter: router };
