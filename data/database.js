/** @format */

const mongoose = require('mongoose');

let database;

async function initDb() {
  database = await mongoose.connect('mongodb://127.0.0.1:27017/demo052566', {
    useNewUrlParser: true,
  });
}

function getDb() {
  if (!database) {
    throw new Error('Database not connected');
  }
  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
