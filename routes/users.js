const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');

const db_tools = require('../db/connection');
const controllers = require('../controllers/controllers');

const ObjectId = require("mongodb").ObjectId;


router.route('/users/register/').post((req, res) => {
  let db_connect = db_tools.getDB('plants');
  let collection = db_connect.collection('users');
  const {username, email, password} = req.body;


    collection
      .find({$or: [{username: username}, {email: username}]}).collation({locale: 'en', strength: 2})
      /*user can type email or username to login, so search for any 
      document whose email or username matches the 'username' field*/
      
      .toArray(async (err, result) => {
        if (err) throw err;
        if (result.length > 0) res.send('You are already registered.')
        //check that account does not already exist
        else {
          try {
            let hashedPassword = await controllers.hashPassword(password);
            //create password hash
            collection
              .insertOne({
                username: username,
                email: email,
                password: hashedPassword,
                garden: {}
              })
              //if account does not already exist, insert a document for it
              .then(
                res.send('Successfully registered.')
              )
              /*.then(
                db_tools.close()
              )*/

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
  const {username, password} = req.body;
  
  collection.find({$or: [{username: username}, 
    {email: username}]}).collation({locale: 'en', strength: 2})
    /*user can type email or username to login, so search for any 
      document whose email or username matches the 'username' field*/
    
    .toArray(async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        //check that the account exists at all
        const hashResult = await bcrypt.compare(password, result[0].password);
        if (hashResult === true) res.json({truth: true});
        //if password matches the hash, login
        else res.json({truth: false, message: 'Oops, something went wrong.'}); 
      } else res.json({truth: false, message: 'Invalid email or username.'});
    })

})

module.exports = router;