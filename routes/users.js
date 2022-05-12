const express = require('express');

const router = express.Router();


const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;


router.route('/users/register/').post((req, res) => {
  let db_connect = db_tools.getDB('plants');
  let collection = db_connect.collection('users');
    collection
      .find({username: req.body.username}).collation({locale: 'en', strength: 2})
      .toArray((err, result) => {
        if (err) throw err;
        if (result.length > 0) res.send('You are already registered.')
        else {
          try {
            collection
              .insertOne({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
              })
              .then(
                res.send('Successfully registered.')
              )

          } catch (err) {
            console.log(err);
          }
          }
      })
  }
);

router.route('/users/login/').post((req, res) => {
  let db_connect = db_tools.getDB('plants');
  const collection = db_connect.collection('users')
    collection.find({username: req.body.username}).collation({locale: 'en', strength: 2})
    .toArray((err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({truth:true});
      } else res.json({truth: false, message: 'Invalid username.'});
    })

})

module.exports = router;