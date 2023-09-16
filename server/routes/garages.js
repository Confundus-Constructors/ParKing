const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const model = require('../models');
const controller = require('../controllers');

garageRouter.get('/', async (req, res) => {
  // technically should read req.query for address
    // then call API to convert address to lat / long
    // then use lat / long to query garages and sort by distance
  const obj = req.query;
  // const obj = {
  //   location: '123 ABC St',
  //   start_date: "2023-09-17 02:24:00",
  //   end_date: "2023-09-17 04:24:00",
  // }

  const garageData = await model.queryAll('garages');

  // get reservation data
  const transactionCount = await model.queryCountReservationTimes(obj.start_date, obj.end_date);
  const parkingSpotCount = await model.queryCountParkingSpots(); // is this necessary? it's a screenshot of what's happening now....

  // subtract reserved spots from available spots
  const availableSpots = controller.subtractReservedSpots(parkingSpotCount.rows, transactionCount.rows); // probably not necessary and will take out later

  // nest into garage obj
  const result = controller.nestCountIntoGarageData(garageData.rows, availableSpots);

  res.status(201).send(result);
});

module.exports = garageRouter;
