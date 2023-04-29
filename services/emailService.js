const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailToken = (email, token) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Activate user',
    html: `<p>For verify your email click on link below</p> <a href="https://smisyuk4.github.io/yummy-react-frontend/verify/${token}" target="blank">${token}</>`,
  };
  sgMail.send(msg);
};
const sendEmail = ({ to, subject, html }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    html,
  };
  sgMail.send(msg);
};
module.exports = { sendEmailToken, sendEmail };
