const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
};


const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;

  const userExists = await User.find({$or: [{username}, {email: username}]}).collation({locale: 'en', strength: 2})
  /*user can type email or username to login, so search for any 
  document whose email or username matches the 'username' field*/
  if (userExists.length > 0) {
    //check that account does not already exist
    res.status(400).json('You are already registered.');
    throw new Error('User already exists.');
  }

  let hashedPassword = await hashPassword(password);
  //create password hash
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    garden: {}
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      garden: user.garden,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json('Invalid user data.');
    throw new Error('Invalid user data.');
  }
})


const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;
  
  const user = await User.findOne({$or: [{username: username}, 
    {email: username}]}).collation({locale: 'en', strength: 2});
  
    /*user can type email or username to login, so search for any 
      document whose email or username matches the 'username' field*/
    if (!user) {
      //if no such username/email exists, let the user know
      res.status(400).json({truth: false, message: 'Invalid email or username.'})
      throw new Error('Invalid credentials.');
    } else {

      const hashResult = await bcrypt.compare(password, user.password);
      if (hashResult === true) {
        res.json({
          _id: user.id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      }
      //if user exists and passwords match, log the user in
      else {
        res.status(400).json({truth: false, message: 'Oops, something went wrong.'});
        throw new Error('Something went wrong.');
      }
    }
})

const verifyUser = (req, res) => {
  /*const { _id, username } = req.body;
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      res.json({truth: true});

    } catch(error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
*/
  res.json({truth: true});
}

module.exports = {
  hashPassword,
  generateToken,
  registerUser,
  loginUser, 
  verifyUser
}
