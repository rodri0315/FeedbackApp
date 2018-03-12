const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

constructor({ subject, recipients }, content) {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email('no-reply@feedbackloop.com')
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;