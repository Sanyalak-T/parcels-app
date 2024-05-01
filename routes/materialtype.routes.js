/** @format */

const express = require('express');
const MaterialType = require('../models/materialtype.model');
const router = express.Router();

// material types
router.post('/materialtypes', async (req, res) => {
  const materialTypePayload = req.body;
  const materialType = new MaterialType(materialTypePayload);
  await materialType.save();
  res.status(201).end();
});

router.get('/materialtypes', async (req, res) => {
  const materialTypes = await MaterialType.find({});
  res.json(materialTypes);
});

router.get('/materialtypes/:id', async (req, res) => {
  const { id } = req.params;
  const materailType = await MaterialType.findById(id);
  res.json(materailType);
});

router.put('/materialtypes/:id', async (req, res) => {
  const materialTypePayload = req.body;
  const { id } = req.params;

  const materialType = await MaterialType.findByIdAndUpdate(id, {
    $set: materialTypePayload,
  });
  res.json(materialType);
});

router.patch('/materialtypes/:id', async (req, res) => {
  const materialTypePayload = req.body;
  const { id } = req.params;

  const materialType = await MaterialType.findByIdAndUpdate(id, {
    $set: materialTypePayload,
  });
  res.json(materialType);
});

router.delete('/materialtypes/:id', async (req, res) => {
  const { id } = req.params;
  await MaterialType.findByIdAndDelete(id);
  res.json(204).end();
});

module.exports = router;
