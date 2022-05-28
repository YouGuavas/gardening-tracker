const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGO_URI;

module.exports = {
  connectToServer: async () => {
    try {
      const connection = await mongoose.connect(uri, {  
        useNewUrlParser: true,  
        useUnifiedTopology: true
    })
      console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {
      console.log(error)
      process.exit(1);
    }
  }
}