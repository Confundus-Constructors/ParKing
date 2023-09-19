const express = require('express');
const reservationRouter = express.Router();
const path = require('path');
const model = require('../models');

reservationRouter.get('/:garage_id', async (req, res) => {
  try {
    const garageId = req.params.garage_id;
    const filter = req.query.filter;
    if (filter === 'reserved') {
      const reservations = await model.queryReservations(garageId, filter);
      if (reservations.rows.length > 0) {
        res.status(201).send(reservations.rows);
      } else {
        res.status(202).send([]);
      }
    } else {
      const reservations = await model.queryReservationsParked(garageId, filter);
      if (reservations.rows.length > 0) {
        res.status(201).send(reservations.rows);
      } else {
        res.status(202).send([]);
      }
    }
  } catch (err) {
    console.log('an error occurred on garages route', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = reservationRouter;
