const express = require('express');
const router = express.Router();
const { getGarden, updateGarden } = require('../controllers/gardenControllers');
const { protect } = require('../middleware/authMiddleware');

router.get('/garden_plants/:_id', protect, getGarden);//.get(getGarden);

router.post('/garden_plants/', protect, updateGarden);//.post(updateGarden)

//router.post('/garden_plants/update_count', protect);



module.exports = router;