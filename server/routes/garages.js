const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const model = require('../models');
const controller = require('../controllers');

garageRouter.get('/', async (req, res) => {
  try {
    const obj = req.query;
    let result;
    const garageData = await model.queryAll('garages');

    if (garageData.rows.length > 0) {
      const transactionCount = await model.queryCountReservationTimes(obj.start_date, obj.end_date);
      const parkingSpotCount = await model.queryCountParkingSpots();

      if (parkingSpotCount.rows.length > 0 && transactionCount.rows.length > 0) {
        const availableSpots = controller.subtractReservedSpots(parkingSpotCount.rows, transactionCount.rows);
        result = controller.nestCountIntoGarageData(garageData.rows, availableSpots);
      } else {
        result = garageData.rows;
      }
      res.status(201).send(result);
    } else {
      res.status(202).send([]);
    }
  } catch (err) {
    console.log('an error occurred on garages test route', err);
    res.status(500).send('Internal Server Error');
  }
});

garageRouter.get('/test', async (req, res) => {
  try {
    // let garageData;
    // const responseArray = await controller.lookupLatLong(req.query.location);
    // const responseData = responseArray.data;

    // if (responseData.locations.length > 0) {
      // const latitude = responseData.locations[0].referencePosition.latitude;
      // const longitude = responseData.locations[0].referencePosition.longitude;
      const latitude = 25.790780;
      const longitude = -80.130099;
      const garageData = await model.queryGaragesByDistanceTest(latitude, longitude);
    // } else {
    //   // if api doesn't return anything
    //   garageData = await model.queryAll('garages');
    // }
    const data = garageData.rows;
    console.log(data);

    res.status(201).send(data);
  } catch (err) {
    console.log('an error occurred on garages test route', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = garageRouter;
