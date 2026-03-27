const router = require('express').Router();
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/login', (req, res) => res.render('auth/login'));
router.get('/register', (req, res) => res.render('auth/register'));
router.get('/forgot-password', (req, res) => res.render('auth/forgot'));
router.get('/bicicletas', ensureAuthenticated, (req, res) => res.render('bicicletas'));

module.exports = router;
