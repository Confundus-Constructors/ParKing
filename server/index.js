const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const model = require('./models/index.js');
const multer = require('multer');
const cors = require('cors');
// const {host, port} = require("../env.js");
require("dotenv").config();
// const userRoute = require('./routes/users');
// const restRouter = require('./routes/transactions.js');
const transactionRouter = require("./routes/transactions.js");
const reservationRouter = require("./routes/reservations.js");
const garageRouter = require("./routes/garages.js");
const vehicleRouter = require("./routes/vehicles.js");
const { getUser, getEmployeeGarage, postUser, putUser, getAll, putUserAuth } = require("./routes/users");

// app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors());
// app.use('/users', userRoute);
app.use('/reservations', reservationRouter);
app.use('/transactions', transactionRouter);
app.use('/garages', garageRouter);
app.use('/vehicles', vehicleRouter);

const port = process.env.SERVER_PORT || 3001;

app.get("/users", (req, res) => {
  req.query.length > 0 ? getUser(req, res) : getAll(req, res);
});

app.get("/users/employees/:id", (req, res) => {
  getEmployeeGarage(req, res);
})

app.post("/users", (req, res) => {
  postUser(req, res);
});

app.put("/users", (req, res) => {
  putUser(req, res);
});

app.put("/users/auth", (req, res) => {
  putUserAuth(req, res);
});

app.post("/image", async (req, res) => {
  try {
   const result = await model.updateCarPhoto(req.body.qr_code, req.body.image);
    res.end("Picture Updated");
  } catch (err) {
    res.status(404).send('Error while updating picture');
  }
});

app.get("/image/:qr_code", async(req, res) => {
  try {
    const result = await model.getCarPhoto(req.params.qr_code);
    res.json(result)
  } catch (err) {
    res.status(404).send('Error while getting picture');
  }
});

app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});
