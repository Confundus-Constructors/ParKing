const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const model = require('../models');
const controller = require('../controllers');

garageRouter.get('/', async (req, res) => {
  try {
    const obj = req.query;
    let result;
    // const garageData = await model.queryAll('garages');
    const garageData = await model.queryAllGarages();

    if (garageData.rows.length > 0) {
      const transactionCount = await model.queryCountReservationTimes(obj.start_date, obj.end_date);
      const parkingSpotCount = await model.queryCountParkingSpots();

  // console.log('garageData - ', garageData.rows);
  // console.log('transCount - ', transactionCount.rows);
  // console.log('parkingSpotCount - ', parkingSpotCount.rows);

  // subtract reserved spots from available spots
  const availableSpots = controller.subtractReservedSpots(parkingSpotCount.rows, transactionCount.rows);

  // nest into garage obj
  const result = controller.nestCountIntoGarageData(garageData.rows, availableSpots);

  res.status(201).send(result);
});

module.exports = garageRouter;
