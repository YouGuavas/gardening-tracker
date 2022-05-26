const { MongoClient } = require('mongodb');
require('dotenv').config();

const database = process.env.DATABASE || 'plants';
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var _db;

module.exports = {
  close: () => {
    client.close();
  },
  connectToServer: (cb) => {
    client.connect((err, db) => {
      if (db) {
        _db = db.db(database);
        console.log('Successfully connected to MongoDB.')
      }
      return cb(err);
    }); 
  },
  getDB: () => {
    return _db;
  }
}