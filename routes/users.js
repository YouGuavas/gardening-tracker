const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;


router.route('/users/register/').post((req, res) => {
  console.log(req.body);
  let db_connect = db_tools.getDB('garden-users');
  db_connect
    .collection('users')
    .find({username: req.body.username})
      .then((item) => {
        console.log(item)
      })
      .catch(err => console.error(`Unable to find documents: ${err}`))
    
});

module.exports = router;