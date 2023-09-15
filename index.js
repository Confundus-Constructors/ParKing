const path = require("path");
const express = require("express");
const app = express();
require('dotenv').config();
// const userRoute = require('./routes/users');
// const restRouter = require('./routes/transactions.js');

// app.use(express.static(path.join(__dirname, "../public")));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.use('/users', userRoute);
// app.use('/transactions', transactionsRoute);

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});