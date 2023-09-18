const express = require('express');
const transactionRouter = express.Router();
const path = require('path');
const model = require('../models');
// const controller = require('../controllers');

transactionRouter.get('/:qr_code', async (req, res) => {
  try {
    const qr_code = req.params.qr_code;

    // query to find if it's checked-in
    const status = await model.queryReservationStatus(qr_code);
    const current_status = status.rows[0].current_status;
    // console.log(current_status);

    // checking in
    if (current_status === 'reserved') {
      console.log('checking in');
      const data = await model.queryReservationUponArrival(qr_code); // get most data

      if (data.rows.length > 0) {
        const transactionObj = data.rows[0];

        // create query that returns smallest parking spot number in given transactions garage
        const parkingSpot = await model.querySmallestParkingSpot(qr_code);
        const ps_id = parkingSpot.rows[0].id;
        const position = Number(parkingSpot.rows[0].position);

        // combine
        transactionObj.parking_spot_number = position;

        res.status(201).send(transactionObj);
      } else {
        res.status(404).send('No record found for the provided QR code.');
      }

    } else if (current_status === 'checked-in' || current_status === 'picking-up') {
      console.log('checking out');
      // update values and return ps_id
      const data = await model.queryReservationUponCheckout(qr_code);
      if (data.rows.length > 0) {
        const transactionObj = data.rows[0];
        res.status(201).send(transactionObj);
      } else {
        res.status(404).send('No record found for the provided QR code.')
      }

    } else {
      res.status(404).send('Transaction is no longer active.');
    }

  } catch (err) {
    console.log('an error occurred on transaction/:qr_code route', err);
    res.status(500).send('Internal Server Error');
  }

});

transactionRouter.get('/parking_assignment/:qr_code', async (req, res) => {
  try {
    const qr_code = req.params.qr_code;
    // create query that returns smallest parking spot number in given transactions garage
    const parkingSpot = await model.querySmallestParkingSpot(qr_code);
    if (parkingSpot.rows.length > 1) {
      const ps_id = parkingSpot.rows[0].id;
      const position = parkingSpot.rows[0];
      res.status(201).send(position);
    } else {
      res.status(404).send('No record found for the provided QR code.');
    }
  } catch (err) {
    console.log('an error occurred on transaction/:qr_code route', err);
    res.status(500).send('Internal Server Error');
  }
});

transactionRouter.put('/:qr_code', async (req, res) => {
  try {
    const qr_code = req.params.qr_code;

    // query to find if it's checked-in
    const status = await model.queryReservationStatus(qr_code);
    const current_status = status.rows[0].current_status;

    // checking in
    if (current_status === 'reserved') {
      console.log('checking in');

      // create query that returns smallest parking spot number in given transactions garage
      const parkingSpot = await model.querySmallestParkingSpot(qr_code);
      const ps_id = parkingSpot.rows[0].id;
      const position = Number(parkingSpot.rows[0].position);

      // add ability to add photo with updateReservationCheckIn after see how it comes through request
      await model.updateReservationCheckIn(qr_code, ps_id);
      await model.updateParkingSpotStatusCheckIn(ps_id);
      res.status(201).send('Check-in complete.');

    } else if (current_status === 'checked-in' || current_status === 'picking-up') {
      console.log('checking out');
      // update values and return ps_id
      const parking_spot = await model.updateReservationCheckOut(qr_code);
      const ps_id = parking_spot.rows[0].parking_spot_id;
      await model.updateParkingSpotStatusCheckOut(ps_id);
      res.status(201).send('Successfully updated transaction.');

    } else {
      res.status(404).send('Transaction is no longer active.');
    }

  } catch (err) {
    console.log('an error occurred on transaction/:qr_code route', err);
    res.status(500).send('Internal Server Error');
  }

});

// original
// transactionRouter.get('/:qr_code', async (req, res) => {
//   try {
//     const qr_code = req.params.qr_code;

//     // query to find if it's checked-in
//     const status = await model.queryReservationStatus(qr_code);
//     const current_status = status.rows[0].current_status;
//     // console.log(current_status);

//     // checking in
//     if (current_status === 'reserved') {
//       console.log('checking in');
//       const data = await model.queryReservationUponArrival(qr_code); // get most data
//       const transactionObj = data.rows[0];

//       // create query that returns smallest parking spot number in given transactions garage
//       const parkingSpot = await model.querySmallestParkingSpot(qr_code);
//       const ps_id = parkingSpot.rows[0].id;
//       const position = Number(parkingSpot.rows[0].position);

//       // combine
//       transactionObj.parking_spot_number = position;

//       // console.log({transactionObj});

//       await model.updateReservationCheckIn(qr_code, ps_id);
//       await model.updateParkingSpotStatusCheckIn(ps_id);
//       if (data.rows.length > 0) {
//         res.status(201).send(transactionObj);
//       } else {
//         res.status(404).send('No data found for the provided QR code.');
//       }

//     } else if (current_status === 'checked-in') {
//       console.log('checking out');
//       // update values and return ps_id
//       const parking_spot = await model.updateReservationCheckOut(qr_code);
//       const ps_id = parking_spot.rows[0].parking_spot_id;
//       await model.updateParkingSpotStatusCheckOut(ps_id);
//       res.status(201).send('Successfully updated transaction.');

//     } else {
//       res.status(404).send('Transaction is no longer active.');
//     }

//   } catch (err) {
//     console.log('an error occurred on transaction/:qr_code route', err);
//     res.status(500).send('Internal Server Error');
//   }

// });

module.exports = transactionRouter;
