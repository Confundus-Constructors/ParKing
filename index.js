const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
// const userRoute = require('./routes/users');
// const restRouter = require('./routes/transactions.js');

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});