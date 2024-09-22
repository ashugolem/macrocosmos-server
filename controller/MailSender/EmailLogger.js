const Moment = require('moment/moment');
const EmailLog = require('../../models/emailLog')

const logEmail = async (scheduleId, recipientId, emailType) => {
    try {
      await EmailLog.create({
        schedule_id: scheduleId,
        recipient_id: recipientId,
        email_type: emailType,
        email_sent_at: Moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      console.log('Email log saved');
    } catch (error) {
      console.error('Error saving email log:', error);
    }
  };
module.exports = logEmail