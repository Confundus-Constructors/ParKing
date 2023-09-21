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
      // subtract reserved spots from available spots
      const availableSpots = controller.subtractReservedSpots(parkingSpotCount.rows, transactionCount.rows);
      // nest into garage obj
      const result = controller.nestCountIntoGarageData(garageData.rows, availableSpots);

      res.status(201).send(result);
    } else {
      res.status(202).send([]);
    }
  } catch (err) {
    console.log('an error occurred on garages route', err);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = garageRouter;
