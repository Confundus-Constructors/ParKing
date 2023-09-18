const express = require('express');
const transactionRouter = express.Router();
const path = require('path');
// const model = require('../models');
// const controller = require('../controllers');

transactionRouter.get('/:qr_code', async (req, res) => {
  const qr_code = req.params;

  // transactions
    // reservation_id
    // reservation start
    // reservation end

  // users
    // owner

  // vehicles
    // make
    // color
    // license plate

  // garages
    // garage address

  // parking_spots
    // parking spot

  res.status(201).send('test');

  // also need to update values
});

module.exports = transactionRouter;
