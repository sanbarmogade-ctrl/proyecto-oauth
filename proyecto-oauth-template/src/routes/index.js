const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

router.get('/', bikeController.renderHome);
router.get('/welcome', bikeController.getWelcome);
router.get('/api/bikes/memory', bikeController.getMemoryBikes);
router.get('/api/bikes', bikeController.getAll);
router.get('/api/bikes/:id', bikeController.getOne);
router.post('/api/bikes', bikeController.create);
router.put('/api/bikes/:id', bikeController.update);
router.delete('/api/bikes/:id', bikeController.remove);

module.exports = router;
