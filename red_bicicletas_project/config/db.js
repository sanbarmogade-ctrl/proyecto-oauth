const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/red_bicicletas';

function connect() {
  return mongoose.connect(dbUrl);
}

module.exports = { connect, dbUrl };
