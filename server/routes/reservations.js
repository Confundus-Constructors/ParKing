const express = require('express');
const reservationRouter = express.Router();
const path = require('path');
const model = require('../models');

reservationRouter.get('/:garage_id', async (req, res) => {
  const garageId = req.params.garage_id;
  const filter = req.query.filter;
  if (filter === 'reserved') {
    const reservations = await model.queryReservations(garageId, filter);
    res.status(201).send(reservations.rows);
  } else {
    const reservations = await model.queryReservationsParked(garageId, filter);
    res.status(201).send(reservations.rows);
  }
});

module.exports = reservationRouter;
