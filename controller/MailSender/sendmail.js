const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'singh.ashishhhh@gmail.com',
        pass: 'cviqsjzqtagdscqr',
    },
  });
  
  // Function to send email
  const sendEmail = async (recipientEmail, scheduleDetails, emailType) => {
    const { schedule_comment, schedule_time, schedule_date } = scheduleDetails;
    const mailOptions = {
      to: recipientEmail,
      subject: `Reminder: Scheduled event on ${schedule_date} at ${schedule_time}`,
      text: `Dear ${emailType === 'admin' ? 'Admin': 'Employee'}, \n\nThis is a reminder for your scheduled event: "${schedule_comment}" happening at ${schedule_time} on ${schedule_date}.\nBe on time please!\n\nBest regards,\nYour Team`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Reminder email (${emailType}) sent to ${recipientEmail}`);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

module.exports = sendEmail