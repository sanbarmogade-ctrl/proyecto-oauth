const mongoose = require('mongoose');

const bicicletaSchema = new mongoose.Schema({
  color: { type: String, required: true },
  modelo: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
