/** @format */

const express = require('express');
const TestingTime = require('../models/testingtime.model');
const router = express.Router();

// testing time
router.post('/testingtimes', async (req, res) => {
  const testingTimePayload = req.body;
  const testingTime = new TestingTime(testingTimePayload);
  await testingTime.save();
  res.status(201).end();
});

router.get('/testingtimes', async (req, res) => {
  const testingTimes = await TestingTime.find({});
  res.json(testingTimes);
});

router.get('/testingtimes/:id', async (req, res) => {
  const { id } = req.params;
  const testingTime = await TestingTime.findById(id);
  res.json(testingTime);
});

router.put('/testingtimes/:id', async (req, res) => {
  const testingTimePayload = req.body;
  const { id } = req.params;

  const testingTime = await TestingTime.findByIdAndUpdate(id, {
    $set: testingTimePayload,
  });
  res.json(testingTime);
});

router.patch('/testingtimes/:id', async (req, res) => {
  const testingTimePayload = req.body;
  const { id } = req.params;

  const testingTime = await TestingTime.findByIdAndUpdate(id, {
    $set: testingTimePayload,
  });
  res.json(testingTime);
});

router.delete('/testingtimes/:id', async (req, res) => {
  const { id } = req.params;
  await TestingTime.findByIdAndDelete(id);
  res.json(204).end();
});

module.exports = router;
