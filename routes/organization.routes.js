/** @format */

const express = require('express');
const Organization = require('../models/organization.model');
const router = express.Router();

// organizations
router.post('/organizations', async (req, res) => {
  const organizationPayload = req.body;
  const organization = new Organization(organizationPayload);
  await organization.save();
  res.status(201).end();
});

router.get('/organizations', async (req, res) => {
  const organizations = await Organization.find({});
  res.json(organizations);
});

router.get('/organizations/:id', async (req, res) => {
  const { id } = req.params;
  const organization = await Organization.findById(id);
  res.json(organization);
});

router.put('/organizations/:id', async (req, res) => {
  const organizationPayload = req.body;
  const { id } = req.params;

  const organization = await Organization.findByIdAndUpdate(id, {
    $set: organizationPayload,
  });
  res.json(organization);
});

router.patch('/organizations/:id', async (req, res) => {
  const organizationPayload = req.body;
  const { id } = req.params;

  const organization = await Organization.findByIdAndUpdate(id, {
    $set: organizationPayload,
  });
  res.json(organization);
});

router.delete('/organizations/:id', async (req, res) => {
  const { id } = req.params;
  await Organization.findByIdAndDelete(id);
  res.json(204).end();
});

module.exports = router;
