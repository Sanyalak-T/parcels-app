/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    departmentname: String,
    departmentnameremark: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DepartmentModel = mongoose.model('Department', departmentSchema);
module.exports = DepartmentModel;
