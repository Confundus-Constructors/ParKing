const express = require('express');
const garageRouter = express.Router();
const path = require('path');
const model = require('../models');
const controller = require('../controllers');
const crypto = require('crypto');

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

// garageRouter.get('/test', async (req, res) => {
//   // try {
//   //   const responseArray = await controller.lookupLatLong(req.query.location);
//   //   const responseData = responseArray.data;
//   //   const latitude = responseData.locations[0].referencePosition.latitude;
//   //   const longitude = responseData.locations[0].referencePosition.longitude;
//   //   // console.log({latitude, longitude});

//   //   const result = await model.queryGaragesByDistanceTest(latitude, longitude)

//   //   res.status(201).send(result);
//   // } catch (err) {
//   //   console.log('an error occurred on garages test route', err);
//   //   res.status(500).send('Internal Server Error');
//   // }
// });

// garageRouter.get('/test_crpyto', async (req, res) => {
//   const crypto = require('crypto');
//   const conf_code = crypto.randomBytes(8).toString('base64');
//   res.status(201).send({conf_code});
// })

module.exports = garageRouter;
