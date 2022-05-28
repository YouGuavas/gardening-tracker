const express = require('express');
const router = express.Router();
const {getInfo, getInfoByPlant} = require('../controllers/infoControllers');



router.route('/information/:plant_type').get(getInfo);

router.route('/information/:plant_type/:plant_name').get(getInfoByPlant);

module.exports = router;