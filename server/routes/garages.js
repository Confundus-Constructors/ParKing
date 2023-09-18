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
  // console.log({obj});
  // const obj = {
  //   location: '123 ABC St',
  //   start_date: "2023-09-17 02:24:00",
  //   end_date: "2023-09-17 04:24:00",
  // }

  // get garage data, parking spot data, reservation data
  const garageData = await model.queryAll('garages');
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

garageRouter.get('/')

module.exports = garageRouter;
