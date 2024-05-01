/** @format */

const express = require('express');
const Department = require('../models/department.model');
const router = express.Router();

// departments
router.post('/departments', async (req, res) => {
  const departmentPayload = req.body;
  const department = new Department(departmentPayload);
  await department.save();
  res.status(201).end();
});

router.get('/departments', async (req, res) => {
  const departments = await Department.find({});
  res.json(departments);
});

router.get('/departments/:id', async (req, res) => {
  const { id } = req.params;
  const department = await Department.findById(id);
  res.json(department);
});

router.put('/departments/:id', async (req, res) => {
  const departmentPayload = req.body;
  const { id } = req.params;

  const department = await Department.findByIdAndUpdate(id, {
    $set: departmentPayload,
  });
  res.json(department);
});

router.patch('/departments/:id', async (req, res) => {
  const departmentPayload = req.body;
  const { id } = req.params;

  const department = await Department.findByIdAndUpdate(id, {
    $set: departmentPayload,
  });
  res.json(department);
});

router.delete('/departments/:id', async (req, res) => {
  const { id } = req.params;
  await Department.findByIdAndDelete(id);
  res.json(204).end();
});

module.exports = router;
