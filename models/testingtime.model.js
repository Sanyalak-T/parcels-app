/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testingTimeSchema = new Schema(
  {
    testingtimename: String,
    testingtimedate: Date,
    testingtimedatetwo: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const testingTimeModel = mongoose.model('TestingTime', testingTimeSchema);
module.exports = testingTimeModel;
