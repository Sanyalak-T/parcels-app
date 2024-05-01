/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialTypeSchema = new Schema(
  {
    materialtypename: String,
    materialtyperemark: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MaterailTypeModel = mongoose.model('MaterailType', materialTypeSchema);
module.exports = MaterailTypeModel;
