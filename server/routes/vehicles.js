const express = require('express');
const vehicleRouter = express.Router();
const path = require('path');
const model = require('../models');

vehicleRouter.get('/:id', async (req, res) => {
  const data = await model.queryAllWhere('vehicles', 'user_id', req.params.id);
  res.status(201).send(data.rows);
});

module.exports = vehicleRouter;
