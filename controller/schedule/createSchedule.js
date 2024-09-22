const moment = require('moment');
const Schedule = require('../../models/schedule');
const ScheduleEmployee = require('../../models/scheduleEmployees');

const isValidDate = (dateString) => {
    // if the date is valid and a future date
    return moment(dateString, 'YYYY-MM-DD', true).isValid() && moment(dateString).isAfter(moment());
};

const isValidTime = (timeString) => {
    // if the time is valid in HH:MM:SS format
    return moment(timeString, 'HH:mm:ss', true).isValid();
};

const createSchedule = async (req, res) => {
    const { admin_id, schedule_date, schedule_time, schedule_comment
          ,  users 
          } = req.body;

    if (!admin_id || !schedule_date || !schedule_time || !schedule_comment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!isValidDate(schedule_date)) {
        return res.status(400).json({ message: 'Please provide a valid date in YYYY-MM-DD format and ensure it is a future date.' });
    }

    if (!isValidTime(schedule_time)) {
        return res.status(400).json({ message: 'Please provide a valid time in HH:MM:SS format.' });
    }
    if(users.length===0){
        return res.status(400).json({ message: 'Please provide atleast one user for creating schedule' });   
    }
    
    try {
        const newSchedule = await Schedule.create({
            admin_id,
            schedule_date,
            schedule_time,
            schedule_comment
        });
        try {
            users.map(async (user)=>{
              await ScheduleEmployee.create({
                user_id: user.user_id,
                schedule_id: newSchedule.schedule_id
              })            
            })            
        } catch (error) {
            console.log(error);
        }
        res.status(201).json(newSchedule);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating schedule' });
    }
};

module.exports =  createSchedule ;
