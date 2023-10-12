const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const model = require('./models/index.js');
const multer = require('multer');
const cors = require('cors');
require("dotenv").config();
const stripe = require('stripe')(`${process.env.SK}`);
// const {host, port} = require("../env.js");

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

const port = process.env.SERVER_PORT;

app.get("/users", (req, res) => {
  Object.keys(req.query).length > 0 ? getUser(req, res) : getAll(req, res);
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

app.post("/create-setup-intent", async (req, res) => {
  try {
      const setupIntent = await stripe.setupIntents.create();
      res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get("/requestNewToken", async (req, res) => {
  try {
      const response = await fetch('https://maps-api.apple.com/v1/token', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${process.env.MAPTOKEN}`
          },
      });
      if (response.status === 200) {
          const data = await response.json();
          res.json({
              accessToken: data.accessToken,
              expiresInSeconds: data.expiresInSeconds
          });
      } else {
          console.error('Token refresh failed');
          res.status(500).send('Token refresh failed');
      }
  } catch (error) {
      console.error('Error refreshing token', error);
      res.status(500).send('Error refreshing token');
  }
});



app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});
//