const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;

router.route('/garden_plants').get(async (req, res) => {
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    const collection = db_connect.collection('users');
    try {
      let result = await collection.findOne({username: 'YouGuavas'});
      console.log('hi');
      res.json(result.garden);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});
router.route('/garden_plants').post()



module.exports = router;