const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userController');
const getAllUsers = require('../controller/user/getUser');
const adminValidation = require('../middleware/adminValidation');
const tokenValidation = require('../middleware/userValidation');


router.get('/', tokenValidation, adminValidation, getAllUsers);

router.post('/', tokenValidation, adminValidation, userController.createUser); 

router.post('/login', userController.login);

module.exports = router;