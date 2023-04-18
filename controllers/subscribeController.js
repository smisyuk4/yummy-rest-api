
const { createSubscription } = require('../services/subsctiptionServices');
const { getUserByFild, updateUser } = require('../services/userServices');
const sendEmail = require('../helpers/sendEmail');
const { HttpError } = require('../helpers/HttpError');


const subscribe = async (req, res) => {
	const {email} = req.body;


// find current user
  const user = await getUserByFild({email});
  const id = user._id;

//compare email in form with email of current user 
  if (email != user.email) {
    throw HttpError(404, `Not found user with ${email}`);
  }

// update subscription of current user in users collection
  const sub = {
    subscription: true,
  };
  const data = await updateUser(id, sub);
  if (!data) {
    throw HttpError(400, 'Not found user');
  }

// create subscription with current user in subscriptions collection
  await createSubscription({email, id})

// send letter for current user with subscription notification
  const letter = {
    to: email,
    subject: 'Yummy team',
    html: `<h2>Wellcome, ${user.name}!</h2>
            <p> Thanks for subscribing to our newsletter!</p>
            <p>With best regards, your Yummy team.</p>`,
  };

  await sendEmail(letter);


	res.status(200).json({
		message: "Subscription letter send",
	});
};

module.exports = {subscribe};
