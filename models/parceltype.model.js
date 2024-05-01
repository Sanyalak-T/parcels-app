/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelTypeSchema = new Schema(
  {
    parceltypename: String,
    equipmentkind: String,
    parceltyperemark: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const parcelTypeModel = mongoose.model('ParcelType', parcelTypeSchema);
module.exports = parcelTypeModel;
