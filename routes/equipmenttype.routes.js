/** @format */

const express = require('express');
const EquipmentType = require('../models/equipmenttype.model');
const router = express.Router();

// equipment types
router.post('/equipmenttypes', async (req, res) => {
  const equipmentTypePayload = req.body;
  const equipmentType = new EquipmentType(equipmentTypePayload);
  await equipmentType.save();
  res.status(201).end();
});

router.get('/equipmenttypes', async (req, res) => {
  const equitmentTypes = await EquipmentType.find({});
  res.json(equitmentTypes);
});

router.get('/equipmenttypes/:id', async (req, res) => {
  const { id } = req.params;
  const equipmentType = await EquipmentType.findById(id);
  res.json(equipmentType);
});

router.put('/equipmenttypes/:id', async (req, res) => {
  const equipmentTypePayload = req.body;
  const { id } = req.params;

  const equitmentType = await EquipmentType.findByIdAndUpdate(id, {
    $set: equipmentTypePayload,
  });
  res.json(equipmentTypePayload);
});

router.patch('/equipmenttypes/:id', async (req, res) => {
  const equipmentTypePayload = req.body;
  const { id } = req.params;

  const equipmentType = await EquipmentType.findByIdAndUpdate(id, {
    $set: equipmentTypePayload,
  });
  res.json(equipmentType);
});

router.delete('/equitmenttypes/:id', async (req, res) => {
  const { id } = req.params;
  await EquipmentType.findByIdAndDelete(id);
  res.json(204).end();
});

module.exports = router;
