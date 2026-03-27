const router = require('express').Router();
const Bicicleta = require('../models/bicicleta');
const { verifyJwt } = require('../middleware/auth');

router.get('/', verifyJwt, async (req, res) => {
  const docs = await Bicicleta.find();
  res.json(docs);
});

router.post('/', verifyJwt, async (req, res) => {
  const doc = await Bicicleta.create(req.body);
  res.status(201).json(doc);
});

module.exports = router;
