const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const db_tools = require('../db/connection');

const ObjectId = require("mongodb").ObjectId;


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

router.route('/users/register/').post((req, res) => {
  let db_connect = db_tools.getDB('plants');
  let collection = db_connect.collection('users');


    collection
      .find({$or: [{username: req.body.username}, {email: req.body.username}]}).collation({locale: 'en', strength: 2})
      .toArray(async (err, result) => {
        if (err) throw err;
        if (result.length > 0) res.send('You are already registered.')
        //check that account does not already exist
        else {
          try {
            let password = await hashPassword(req.body.password);
            //create password hash
            collection
              .insertOne({
                username: req.body.username,
                email: req.body.email,
                password: password,
                garden: {}
              })
              //if account does not already exist, insert a document for it
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
  
  collection.find({$or: [{username: req.body.username}, 
    {email: req.body.username}]}).collation({locale: 'en', strength: 2})
    
    .toArray(async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        //check that the account exists at all
        const hashResult = await bcrypt.compare(req.body.password, result[0].password);
        if (hashResult === true) res.json({truth: true});
        //if password matches the hash, login
        else res.json({truth: false, message: 'Oops, something went wrong.'}); 
      } else res.json({truth: false, message: 'Invalid email or username.'});
    })

})

module.exports = router;