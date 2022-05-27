const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGO_URI;

let _db;
module.exports = {
  connectToServer: async (cb) => {
    try {
      const connection = await mongoose.connect(uri);
      _db = connection.connection.db;
      console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
      console.log(error)
      process.exit(1);
    }
  },
  getDB: () => {
    return _db;
  }
}