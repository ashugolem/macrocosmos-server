const ScheduleEmployee = require("../../models/scheduleEmployees");


const getAllScheduleEmployee = async (req, res) => {
    
    try {
        const schedules = await ScheduleEmployee.findAll();
        res.status(200).json(schedules);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error Fetching Schedules', msg: err.messsage });
    }
};

module.exports = getAllScheduleEmployee;