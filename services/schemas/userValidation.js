const Joi = require("joi");
const nameRegex = /^[A-ZА-Я][a-z`-а-я0-9]{2,}[\s][A-ZА-Я][a-z`-а-я0-9]{2,}$/;
const passwordRegex = /^[@!#$%&a-zA-Z\d]{8,}$/;
const emailDomain = ["com", "net", "org", "uk"];
const makeRequired = x => x.required();

const userValidation = (data, strict = []) => {
	let schema = Joi.object({
		name: Joi.string().trim().min(3).regex(nameRegex).messages({
			"string.pattern.base": `Name may contain letters, numbers, apostrophe, dash and spaces. For example Jacob Mercer.`,
		}),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: {allow: emailDomain},
		}),
		password: Joi.string()
			.trim()
			.min(8)
			.max(300)
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
