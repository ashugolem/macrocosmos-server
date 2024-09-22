const EmailLog = require("../../models/emailLog");


const getAllEmailLogs = async (req, res) => {
    
    try {
        const EmailLogs = await EmailLog.findAll();
        res.status(200).json(EmailLogs);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error Fetching EmailLogs', msg: err.messsage });
    }
};

module.exports = getAllEmailLogs;