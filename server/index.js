const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
// const userRoute = require('./routes/users');
// const restRouter = require('./routes/transactions.js');
const transactionRouter = require("./routes/transactions.js");
const reservationRouter = require("./routes/reservations.js");
const garageRouter = require("./routes/garages.js");
const vehicleRouter = require("./routes/vehicles.js");
const { getUser, postUser, getAll } = require("./routes/users");
// const transactionRouter = require("./routes/transactions.js");

// app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/users', userRoute);
app.use('/reservations', reservationRouter);
app.use('/transactions', transactionRouter);
app.use('/garages', garageRouter);
app.use('/vehicles', vehicleRouter);

const port = process.env.SERVER_PORT || 3001;

app.get("/users", (req, res) => {
  req.query.length > 0 ? getUser(req, res) : getAll(req, res);
});

app.post("/users", (req, res) => {
  postUser(req, res);
});
app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});
