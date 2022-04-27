const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;


router.route('/info').get((req, res) => {
  res.send('hello world')
});

module.exports = router;