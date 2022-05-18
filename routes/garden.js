const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;

router.route('/garden_plants').get((req, res) => {
  let db_connect = db_tools.getDB('plants');
  db_connect
    .collection('users')
    .findOne({username: 'YouGuavas'}, {garden: 1})
    .then((err, result) => {
      if (err) throw err;
      console.log(result);
      //res.json(result);
    })  
    .catch((err) => {
      res
        .status(500)
        .send({message: 'Error getting garden'})
    })
});
router.route('/garden_plants').post()



module.exports = router;