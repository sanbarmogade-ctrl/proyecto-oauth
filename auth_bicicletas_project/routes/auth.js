const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.get('/verify/:token', authController.verify);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/bicicletas',
  failureRedirect: '/login',
  failureFlash: true
}));
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
