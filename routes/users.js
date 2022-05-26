const express = require('express');

const router = express.Router();

const {registerUser, loginUser} = require('../controllers/userControllers');



router.route('/users/register/').post(registerUser);

router.route('/users/login/').post(loginUser);

module.exports = router;