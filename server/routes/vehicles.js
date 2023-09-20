const express = require('express');
const vehicleRouter = express.Router();
const path = require('path');
const model = require('../models');

vehicleRouter.get('/:id', async (req, res) => {
  try {
    const data = await model.queryAllWhere('vehicles', 'user_id', req.params.id);
    if (data.rows.length > 0) {
      res.status(201).send(data.rows);
    } else {
      res.status(202).send([]);
    }
  } catch (err) {
    console.log('an error occurred on vehicles route', err);
    res.status(500).send('Internal Server Error');
  }
});

vehicleRouter.post('/:id', async (req, res) => {
  try {
    let obj = req.body;
    // let obj = {
    //   make_model: 'Toyota Rav4',
    //   license_plate: 'ABGH3902',
    //   color: 'Blue',
    // }
    obj.user_id = req.params.id;
    await model.insertEntry('vehicles', obj);
    res.status(201).send('Added vehicle');
  } catch (err) {
    if (err.code === '23505') {
      res.status(404).send('License plate already exists');
    } else {
      console.log('an error occurred on vehicles route', err);
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = vehicleRouter;
