const moment = require("moment/moment");
const cron = require("node-cron");
const { Op } = require("sequelize");
const sendmail = require("./sendmail");
const EmailLogger = require("./EmailLogger");
const ScheduleEmployee = require("../../models/scheduleEmployees");
const Schedule = require("../../models/schedule");
const sendEmail = require("./sendmail");
const User = require("../../models/user");

// Checking time equality
const checkTime = (EnteredDate) => {
  const currentDate = moment();
  const hourDiff = currentDate.diff(EnteredDate, "hours");
  const minuteDiff = moment(EnteredDate).diff(currentDate, "minutes");
  return minuteDiff;
};

// Emails Sheduler Function for a given schedule
const scheduleEmailReminders = async (schedule) => {
  const { schedule_date, schedule_time, schedule_id } = schedule;
  let isSent = false;
  const reminderTimes = [
    { duration: 60, label: "1hr" },
    { duration: 30, label: "30min" },
    { duration: 15, label: "15min" },
  ];

  try {
    // Fetching employees related to this schedule
    const scheduleEmployees = await ScheduleEmployee.findAll({
      where: { schedule_id },
    });

    if (scheduleEmployees.length === 0) {
      console.log("No employees found for this schedule.");
      return;
    }
    const timeDiff = checkTime(`${schedule_date} ${schedule_time}`);
    // For Admin
    reminderTimes.forEach(async ({ duration, label }) => {
      if (timeDiff == duration) {
        try {
          console.log("timeDiff is equal to the duration");
          console.log("Sending email for "+ label+" to admin");
          const emailResponse = await sendMailToAdmin(schedule);
          console.log(emailResponse);
        } catch (error) {
          console.error({ error });
        }
      }
    });


    // Schedule email reminders for each employee at the respective times
    console.log("Checking for each future schedule");
    scheduleEmployees.forEach(async (scheduleEmployee) => {
      const { user_id } = scheduleEmployee;
      const user = await User.findOne({ where: { user_id } });
      console.log(
        `user with the schedule with id ${schedule_id} is ${user.username}`
      );
      reminderTimes.forEach(async ({ duration, label }) => {
        console.log("Checking for time - ", duration);
        console.log("Time diff is ", timeDiff);
        if (timeDiff == duration) {
          try {
            console.log("timeDiff is equal to the duration");
            isSent = true;
            console.log("Sending email for ", label);
            const emailResponse = await sendmail(user.email, schedule, label);
            console.log(emailResponse);
          } catch (error) {
            console.error({ error });
          } finally {
            await EmailLogger(schedule.schedule_id, user.user_id, label);
            console.log(`Reminder email (${label}) sent to ${user.email}`);
          }
        }
      });
    });
    return isSent;
  } catch (error) {
    console.error("Error fetching employees for schedule:", error);
  }
};

const sendMailToAdmin = async (schedule) => {
  try {
    const response = await sendEmail(
      "singh.ashishhhh@gmail.com",
      schedule,
      "admin"
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    await EmailLogger(schedule.schedule_id, 1, "admin");
    console.log(`Admin email sent for schedule ID - ${schedule.schedule_id}`);
  }
};


// Function to initiate the email scheduler
const initiateEmailScheduler = async () => {
  try {
    const schedules = await Schedule.findAll({
      where: { schedule_date: { [Op.gte]: moment().format("YYYY-MM-DD") } }, // Only future schedules
    });
    let isSent = false;

    schedules.forEach((schedule) => {
      try {
        isSent = scheduleEmailReminders(schedule);
        if (isSent == true) {
          sendMailToAdmin(schedule);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isSent = false;
      }
    });
  } catch (error) {
    console.error("Error initiating scheduler:", error);
  }
};

module.exports = initiateEmailScheduler;
