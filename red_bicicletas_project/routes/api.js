const express = require('express');
const router = express.Router();
const Bicicleta = require('../models/bicicleta');

router.get('/bicicletas', async (req, res) => {
  const bicicletas = await Bicicleta.find();
  res.status(200).json(bicicletas);
});

router.get('/bicicletas/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findById(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'No encontrada' });
    res.status(200).json(bicicleta);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

router.post('/bicicletas', async (req, res) => {
  try {
    const bicicleta = new Bicicleta({
      codigo: req.body.codigo,
      color: req.body.color,
      modelo: req.body.modelo,
      ubicacion: [req.body.lat, req.body.lng]
    });
    const saved = await bicicleta.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/bicicletas/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findById(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'No encontrada' });

    bicicleta.codigo = req.body.codigo ?? bicicleta.codigo;
    bicicleta.color = req.body.color ?? bicicleta.color;
    bicicleta.modelo = req.body.modelo ?? bicicleta.modelo;
    if (req.body.lat !== undefined && req.body.lng !== undefined) {
      bicicleta.ubicacion = [req.body.lat, req.body.lng];
    }

    const updated = await bicicleta.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/bicicletas/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByIdAndDelete(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'No encontrada' });
    res.status(200).json({ message: 'Eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

module.exports = router;
