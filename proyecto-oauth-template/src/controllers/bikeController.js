const Bike = require('../models/bike');

const memoryBikes = [
  {
    id: 1,
    code: 'BA-001',
    color: 'Rojo',
    model: 'Urbana',
    lat: -34.6030,
    lng: -58.3816
  },
  {
    id: 2,
    code: 'BA-002',
    color: 'Azul',
    model: 'Montaña',
    lat: -34.6055,
    lng: -58.3832
  }
];

exports.getWelcome = (req, res) => {
  res.send('Bienvenido a Express - Proyecto Node JS');
};

exports.getMemoryBikes = (req, res) => {
  res.json({
    city: 'Buenos Aires',
    center: {
      lat: -34.6037,
      lng: -58.3816
    },
    bikes: memoryBikes
  });
};

exports.renderHome = (req, res) => {
  res.sendFile('index.html', { root: 'public' });
};

exports.getAll = async (req, res) => {
  const bikes = await Bike.find().sort({ createdAt: -1 });
  res.json(bikes);
};

exports.getOne = async (req, res) => {
  const bike = await Bike.findById(req.params.id);
  if (!bike) {
    return res.status(404).json({ message: 'Bicicleta no encontrada' });
  }
  res.json(bike);
};

exports.create = async (req, res) => {
  const bike = await Bike.create(req.body);
  res.status(201).json(bike);
};

exports.update = async (req, res) => {
  const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bike) {
    return res.status(404).json({ message: 'Bicicleta no encontrada' });
  }

  res.json(bike);
};

exports.remove = async (req, res) => {
  const bike = await Bike.findByIdAndDelete(req.params.id);
  if (!bike) {
    return res.status(404).json({ message: 'Bicicleta no encontrada' });
  }
  res.json({ message: 'Bicicleta eliminada correctamente' });
};
