const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoute");
const scheduleRoutes = require("./routes/scheduleRoute");
const emailRoutes = require("./routes/emailRoutes");
const tokenValidation = require("./middleware/userValidation");
const sendEmail = require("./controller/MailSender/sendmail");
require("dotenv").config();
var cron = require("node-cron");
const moment = require("moment");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const initiateEmailScheduler = require("./controller/MailSender/RemainderMailer");
const { isMoment } = require("moment/moment");
app.use(cors());

// Connecting DB
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Syncing models
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables Synchronised!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/schedule", tokenValidation, scheduleRoutes);
app.use("/api/email-log", emailRoutes);

app.listen(port, () => {
  console.log("Server running on port 5000");
});

// Cron job

initiateEmailScheduler();
cron.schedule('* * * * *', () => {
  console.log("Check");
  initiateEmailScheduler();
});
// const currentDate = moment();
// const formatedDate = currentDate.format("DD-MM-YYYY");

// const EnteredDate = moment("01-01-2024 16:29:10");
// console.log(EnteredDate);
// console.log(currentDate.diff(EnteredDate, 'hours'));
// console.log(currentDate.diff(EnteredDate, 'minute'));
// const hourDiff = currentDate.diff(EnteredDate, "hours");
// const minuteDiff = currentDate.subtract(hourDiff,"hours").diff(EnteredDate, "minutes");
// const secondDiff = currentDate.subtract(minuteDiff,"minutes").diff(EnteredDate, "seconds");

// console.log(
//   EnteredDate.subtract(hourDiff, "hours")
//              .subtract(minuteDiff, "minutes")
//              .subtract(secondDiff, "seconds").format("DD-MM-YYYY hh:mm:ss")
// );
// console.log(`${hourDiff}:${minuteDiff}:${secondDiff}`);
