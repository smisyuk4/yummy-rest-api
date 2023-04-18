const {User} = require("../services/schemas/users");
const {getUserByFild, updateUser} = require("../services/userServices");
const sendEmail = require("../helpers/sendEmail");
const {HttpError} = require("../helpers/HttpError");

const subscribe = async (req, res) => {
	const {email} = req.body;

	const user = await getUserByFild({email});
	const id = user._id;

	if (!user) {
		throw HttpError(404, `Not found user with ${email}`);
	}

	const sub = {
		subscription: true,
	};

	const data = await updateUser(id, sub);
	if (!data) {
		throw HttpError(400, "Not found user");
	}
	const letter = {
		to: email,
		subject: "You have subscribed successful",
		html: `<p>You are subscribe successfully on Yummy's news.</p>`,
	};
	await sendEmail(letter);

	res.status(200).json({
		message: "Subscription letter send",
	});
};

module.exports = {subscribe};
