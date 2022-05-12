const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;


router.route('/information/:plant_type').get((req, res) => {
  let db_connect = db_tools.getDB('plants');
  db_connect
    .collection(req.params.plant_type)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    })
    
});

module.exports = router;