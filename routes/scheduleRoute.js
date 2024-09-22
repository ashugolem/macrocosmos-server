const express = require('express');
const router = express.Router();
const scheduleController = require('../controller/schedule/scheduleController');
const adminValidation = require('../middleware/adminValidation');

router.post('/', adminValidation, scheduleController.createSchedule); 
router.get('/', scheduleController.getAllSchedule); 

module.exports = router;