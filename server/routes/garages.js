const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const garageModel = require('../models/garageModel');

garageRouter.get('/', async (req, res) => {
  const data = await garageModel.queryAll('garages');
  console.log(data);
  res.status(201).send(data);
});

module.exports = garageRouter;