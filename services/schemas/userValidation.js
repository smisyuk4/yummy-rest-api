const Joi = require("joi");
const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
const nameRegex = /^[a-zA-Zа-яА-ЯґҐєЄїЇіІ\d\s]{6,}$/;
const emailRegex = /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/;
const makeRequired = x => x.required();

const userValidation = (data, strict = []) => {
	let schema = Joi.object({
		name: Joi.string().trim().min(1).max(16).regex(nameRegex).messages({
			"string.pattern.base": `Name may contain letters and numbers. For example Jacob Mercer.`,
		}),
		email: Joi.string().trim().regex(emailRegex).messages({
			"string.pattern.base": `Email may only latin letters, numbers and _ @ . symbols.`,
		}),
		password: Joi.string()
			.trim()
			.min(6)
			.max(16)
			.regex(passwordRegex)
			.messages({
				"string.pattern.base": `Password must contain upper and lower case letters, numbers and minimum 6 characters.`,
			}),
		avatarURL: Joi.string().uri(),
	});
	schema = schema.fork(strict, makeRequired);
	return schema.validate(data);
};

module.exports = {userValidation};
