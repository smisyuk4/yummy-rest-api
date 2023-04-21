const Joi = require("joi");
const passwordRegex = /^[@!#$%&a-zа-я\d]{3,}[@!#$%&A-ZА-Я\d]{3,}$/;
const makeRequired = x => x.required();

const userValidation = (data, strict = []) => {
	let schema = Joi.object({
		name: Joi.string().trim().min(1).max(16).messages({
			"string.pattern.base": `Name may contain letters, numbers, apostrophe, dash and spaces. For example Jacob Mercer.`,
		}),
		email: Joi.string().email({
			minDomainSegments: 2,
		}),
		password: Joi.string()
			.trim()
			.min(6)
			.max(16)
			.regex(passwordRegex)
			.messages({
				"string.pattern.base": `Password can contain upper and lower case letters, numbers and one of special characters @!#$%& and minimum 8 characters.`,
			}),
		avatarURL: Joi.string().uri(),
	});
	schema = schema.fork(strict, makeRequired);
	return schema.validate(data);
};

module.exports = {userValidation};
