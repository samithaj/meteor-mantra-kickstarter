/* eslint-disable no-console */

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
/* eslint-disable camelcase   */
  auth: {
    api_key: Meteor.settings.MAILGUN_KEY,
    domain: Meteor.settings.MAILGUN_DOMAIN
  }
/* eslint-enable camelcase   */
};

let mailer = nodemailer.createTransport(mg(auth));

mailer.resetPassword = function resetPassword(_email, _id, _validator) {

  const msg = 'methods.mail.js resetPassword --> ';
  const cfg = Meteor.settings.public.PASSWORD_RESET;
  const host = Meteor.settings.public.HOST_URI;

  mailer.sendMail({
    from: cfg.From,
    to: _email,
    subject: cfg.Subject,
    html: cfg.Html_1 + host + cfg.Route + _id + '-' + _validator + cfg.Html_2,
    text: cfg.Text_1 + host + cfg.Route + _id + '-' + _validator + cfg.Text_2,
  }, function (err, info) {
    if (err) {
      console.log(msg + 'Error: ', err);
    } else {
      console.log(msg + 'Mail host response: ', info.message);
    }
  });
};

export default mailer;