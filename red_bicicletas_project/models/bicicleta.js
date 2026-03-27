const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BicicletaSchema = new Schema({
  codigo: { type: Number, required: true, unique: true },
  color: { type: String, required: true },
  modelo: { type: String, required: true },
  ubicacion: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length === 2;
      },
      message: 'La ubicacion debe tener [lat, lng]'
    }
  }
});

BicicletaSchema.statics.createInstance = function(codigo, color, modelo, lat, lng) {
  return new this({ codigo, color, modelo, ubicacion: [lat, lng] });
};

module.exports = mongoose.model('Bicicleta', BicicletaSchema);
