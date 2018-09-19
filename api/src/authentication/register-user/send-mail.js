const sgMail = require('@sendgrid/mail');
const appConfig = require('../../infrastructure/application-configuration');

sgMail.setApiKey(appConfig.SG_API_KEY);

const sendMail = message => sgMail.send(message);

module.exports = sendMail;
