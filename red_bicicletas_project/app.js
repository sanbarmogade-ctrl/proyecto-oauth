const express = require('express');
const db = require('./config/db');
const apiRouter = require('./routes/api');

const app = express();

db.connect().then(() => {
  console.log('MongoDB conectada');
}).catch((err) => {
  console.error('Error conectando MongoDB:', err.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Bienvenido a Express');
});

app.use('/api', apiRouter);

module.exports = app;
