const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const getGarden = asyncHandler(async (req, res) => {
  const {username} = req.params;
  
  const user = await User.findOne({username});
  if (!user) {
    res.status(500).json('This user does not exist.');
    throw new Error('This user does not exist.');
  }
  res.status(201).json(user.garden);
})

const updateGarden = asyncHandler(async (req, res) => {
  const {username, plant} = req.body;

  const update = await User.findOneAndUpdate({username}, {$set: {[`garden.${plant.name}`]: plant.count}});
  if (!update) {
    res.status(500).json('Could not update plant.');
    throw new Error('Could not update plant.');
  }
  res.status(201).json('Updated!');
})

module.exports = {
  getGarden,
  updateGarden
}