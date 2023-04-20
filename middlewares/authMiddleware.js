const jwt = require("jsonwebtoken");
const {getUserById} = require("../services/userServices");

const protectPath = async (req, res, next) => {
	const {auth} = req.headers;
	if (!auth) {
		return res.status(401).json({message: "Not authorized"});
	}
	const token = auth?.startsWith("Bearer") && auth.split(" ")[1];

	if (!token) {
		return res.status(401).json({message: "Not authorized"});
	}
	const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
	if (!decodedToken) {
		return res.status(401).json({message: "Not authorized"});
	}
	const currentUser = await getUserById(decodedToken.id).select("+token");

	if (!currentUser) return res.status(401).json({message: "Not authorized"});
	if (currentUser.token !== token) {
		return res.status(401).json({
			message: "Not authorized",
		});
	}
	req.user = currentUser;

	next();
};

module.exports = {protectPath};
