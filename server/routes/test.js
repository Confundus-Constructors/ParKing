const express = require('express');
const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
  try {
    console.log('test');
  } catch (err) {
    console.log('an error occurred on garages route', err);
    res.status(500).send('Internal Server Error');
  }
});

testRouter.post('/', async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send('Success')
  } catch (err) {
    console.log('an error occurred on garages route', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = testRouter;