const express = require('express');
const path = require("path");
const cors = require("cors");



const app = express();
app.use(cors());

const db_tools = require('./db/connection');


require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(require('./routes/info'));
app.use(require('./routes/users'));
//app.use(require('./routes/garden'));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})


app.listen(port, () => {
  // perform a database connection when server starts
  db_tools.connectToServer((err) => {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});