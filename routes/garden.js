const express = require('express');
const router = express.Router();
const { getGarden, updateGarden } = require('../controllers/gardenControllers');


router.route('/garden_plants/:username').get(getGarden);

router.route('/garden_plants/').post(updateGarden)

router.route('/garden_plants/update_count').post()



module.exports = router;