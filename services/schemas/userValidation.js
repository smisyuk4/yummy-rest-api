const Joi = require("joi");
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
const nameRegex = /^[a-zA-Zа-яА-ЯґҐєЄїЇіІ\d\s]{6,}$/;
const emailRegex =
	/^[\w!#$%^&*\-=/{}[\]_|`~?\\+][\w!#$%^&*\+\-?=/{}[\]_|`~\\.]{1,62}[\w!#$%^&*\-=/{}+[\]_|`~?\\]@([\w]+\.){1,20}[\w]{1,4}$/;
const makeRequired = x => x.required();

const userValidation = (data, strict = []) => {
	let schema = Joi.object({
		name: Joi.string().trim().min(1).max(16).regex(nameRegex).messages({
			"string.pattern.base": `Name can include numbers and letters (Latin, Cyrillic), the minimum number of characters in the field is 1 (inclusive), the maximum is 16 (inclusive)`,
		}),
		email: Joi.string().trim().regex(emailRegex).messages({
			"string.pattern.base": `The local part of the mail can contain capital and small Latin letters (A-Z, a-z), numbers (from 0 to 9) and special symbols !#$%^&*_-=*/?+ but no more than 64 characters`,
		}),
		password: Joi.string()
			.trim()
			.min(6)
			.max(16)
			.regex(passwordRegex)
			.messages({
				"string.pattern.base": `The password must include numbers and letters - the minimum number of characters in the field - 6 (inclusive), the maximum - 16 (inclusive)`,
			}),
		avatarURL: Joi.string().uri(),
	});
	schema = schema.fork(strict, makeRequired);
	return schema.validate(data);
};

module.exports = {userValidation};
