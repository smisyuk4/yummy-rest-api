const Joi = require("joi");

const newRecipeSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	category: Joi.string().required(),
	time: Joi.string().required(),
	ingredients: Joi.array().required(),
	instructions: Joi.string().required(),
	imageURL: Joi.string().uri(),
});

const ownRecipeStatusSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	newRecipeSchema,
	ownRecipeStatusSchema,
};
