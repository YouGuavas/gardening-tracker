const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;

router.route('/garden_plants/:username').get(async (req, res) => {
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    const collection = db_connect.collection('users');
    try {
      let result = await collection.findOne({username: req.params.username});
      res.json(result.garden);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});
router.route('/garden_plants/').post(async (req, res) => {
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    const collection = db_connect.collection('users');
    try {
      await collection.findOneAndUpdate({username: req.body.username}, {$set: {[`garden.${req.body.plant.name}`]: req.body.plant.count}});
      res.send('Updated!')
    } catch (error) {
      res.status(500).send(error);
    }
  }
})

router.route('/garden_plants/update_count').post()



module.exports = router;