const express = require("express");
const router = express.Router();

const {
  get,
  create,
  getById,
  remove,
  updateStatus,
} = require("../controllers/ownRecipesController");
const {
  newRecipeSchema,
  ownRecipeStatusSchema,
} = require("../services/schemas/ownRecipeValidation");
const validateBody = require("../helpers/validation");
const { protectPath } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/asyncWrapper");

router.use(protectPath);
router
  .route("/")
  .get(asyncWrapper(get))
  .post(validateBody(newRecipeSchema), asyncWrapper(create));

router.route("/:id").get(asyncWrapper(getById)).delete(asyncWrapper(remove));

router.patch(
  "/:id/favorite",
  validateBody(ownRecipeStatusSchema),
  asyncWrapper(updateStatus)
);

module.exports = { ownRecipesRouter: router };
