const express = require('express');
const router = express.Router();
const {registerUser, loginUser, verifyUser} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');


router.route('/users/register/').post(registerUser);

router.route('/users/login/').post(loginUser);

router.route('/users/isloggedin').post(verifyUser, protect);

module.exports = router;