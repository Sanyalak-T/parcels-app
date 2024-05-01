/** @format */

const express = require('express');
const db = require('./data/database');
const enableCors = require('./middlewares/cors');

const organizationRoutes = require('./routes/organization.routes');
const departmentRoutes = require('./routes/department.routes');
const equipmentTypeRoutes = require('./routes/equipmenttype.routes');
const materialTypeRoutes = require('./routes/materialtype.routes');
const parcelTypeRoutes = require('./routes/parceltype.routes');
const parcelRoutes = require('./routes/parcel.routes');

// test time
const testingTimeRoutes = require('./routes/testingtime.routes');

const app = express();

app.use(enableCors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(organizationRoutes);
app.use(departmentRoutes);
app.use(equipmentTypeRoutes);
app.use(materialTypeRoutes);
app.use(parcelTypeRoutes);
app.use(parcelRoutes);

// testime
app.use(testingTimeRoutes);

db.initDb()
  .then(function () {
    app.listen(3000);
    console.log('connecting database successfully');
  })
  .catch(function (error) {
    console.log(error + 'connecting database failed!');
  });
