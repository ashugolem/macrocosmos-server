const express = require('express');
const getAllEmailLogs = require('../controller/EmailLog/getEmailLog');
const tokenValidation = require('../middleware/userValidation');
const adminValidation = require('../middleware/adminValidation');
const router = express.Router();

router.get('/', tokenValidation, adminValidation, getAllEmailLogs); 

module.exports = router;