const validateBody = schema => {
	const func = (req, res, next) => {
		req.body = JSON.parse(req.body.body);
		const {error} = schema.validate(req.body);
		if (error) {
			const [{message}] = error.details;
			return res.status(400).json({message});
		}
		next();
	};

	return func;
};

module.exports = validateBody;
