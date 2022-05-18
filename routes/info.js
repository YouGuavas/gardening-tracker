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

router.route('/information/:plant_type/:plant_name').get(async (req, res) => {
  const regex = /%20/g;
  const name = req.params.plant_name.replace(regex, ' ');
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    let collection = db_connect.collection(req.params.plant_type)
      try{
        let result = await collection.findOne({name: name});
        console.log(result);
        res.json(result);
      } catch(error) {
        res.status(500).send(error);
      }
    }
})

module.exports = router;