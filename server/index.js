const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const model = require('./models/index.js');

require("dotenv").config();
// const userRoute = require('./routes/users');
// const restRouter = require('./routes/transactions.js');
const transactionRouter = require("./routes/transactions.js");
const reservationRouter = require("./routes/reservations.js");
const garageRouter = require("./routes/garages.js");
const vehicleRouter = require("./routes/vehicles.js");
const { getUser, postUser, getAll } = require("./routes/users");

// app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));

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

app.post("/image", async (req, res) => {
  // console.log(req.body.image);
  await model.updateCarPhoto('test2', req.body.image)
  .then((result) => {
    // console.log(result);
    res.end("Picture Updated")
  })
  .catch(() => {
    res.status(404).send('Error wile updating picture');
  })
});

app.get("/image", (req, res) => {
  model.getCarPhoto('test2')
  .then((result) => {
    // console.log(result);
    res.json(result)
  })
  .catch(() => {
    res.status(404).send('Error wile getting picture');
  })
});

app.listen(port, () => {
  console.log(`Listening at port http://${process.env.HOST}:${port}`);
});
