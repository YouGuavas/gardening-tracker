const db_tools = require('../db/connection');


const getGarden = async (req, res) => {
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    const collection = db_connect.collection('users');
    try {
      let result = await collection.findOne({username: req.params.username});
      res.json(result.garden);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

const updateGarden = async (req, res) => {
  let db_connect = db_tools.getDB('plants');
  if (db_connect) {
    const collection = db_connect.collection('users');
    try {
      await collection.findOneAndUpdate({username: req.body.username}, {$set: {[`garden.${req.body.plant.name}`]: req.body.plant.count}});
      res.send('Updated!')
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = {
  getGarden,
  updateGarden
}