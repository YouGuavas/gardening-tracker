const asyncHandler = require('express-async-handler');

const Plant = require('../models/plantModel');

const getInfo = asyncHandler(async (req, res) => {
  const plants = await Plant.find({});
  if (plants.length <= 0) {
    res.status(400).json('Could not find any plants of this type.')
    throw new Error('Could not find any plants of this type.');
  }
  res.status(201).json(plants);
})

const getInfoByPlant = asyncHandler(async (req, res) => {
  const regex = /%20/g;
  const name = req.params.plant_name.replace(regex, ' ');
  //replace url encoding with space
  const plant = await Plant.findOne({name});
  if (!plant) {
    res.status(400).json('Could not find any plant by this name.');
    throw new Error('Could not find any plant by this name.');
  }
  res.status(201).json(plant);
})

module.exports = {
  getInfo,
  getInfoByPlant
}