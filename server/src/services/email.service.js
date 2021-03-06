const { isEmpty } = require('lodash');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport({
  service: 'gmail',
  // secure: true,
  auth: {
    type: 'oauth2',
    user: config.email.username,
    clientId: config.email.clientId,
    clientSecret: config.email.clientSecret,
    refreshToken: config.email.refreshToken,
    // pass: emailConfig.password,
  },
});
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  try {
    await transport.sendMail(msg);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.


Regards,
Flush Cancer Project`;
  await sendEmail(to, subject, text);
};

const sendCampaignUpdateEmail = async (to, remarks, status, campaign) => {
  const subject = `Campaign Updates - ${campaign}`;
  let text = 'Dear user,\n';
  switch (status) {
    case 'Verified':
      text += `Your campaign '${campaign}' is Verified`;
      break;
    case 'Pending':
      text += `Admin has amendments on this campaign`;
      break;
    case 'Unverified':
      text += `Admin has unverified the campaign`;
      break;
    case 'VerifyDocument':
      text += `Please add verification documents`;
      break;
    case 'Changes Rejected':
      text += `Admin has Rejected changes on this campaign`;
      break;

    case 'Changes Approved':
      text += `Admin has Approved changes on this campaign`;
      break;
    default:
      break;
  }

  if (!isEmpty(remarks)) {
    text += `\nAdmin Comment: '${remarks}'`;
  }
  text += `\n\nRegards,\nFlush Cancer Project`;
  await sendEmail(to, subject, text);
};

const sendCampaignDeleteEmail = async (to, campaign) => {
  const subject = `Campaign Deleted - ${campaign}`;
  // replace this url with the link to the reset password page of your front-end app
  const text = `Dear user,
Your reuqest for campaign deletion has been approved.


Regards,
Flush Cancer Project`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendCampaignUpdateEmail,
  sendVerificationEmail,
  sendCampaignDeleteEmail,
};
