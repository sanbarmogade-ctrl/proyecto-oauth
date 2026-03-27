const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const sendMail = require('../services/mailer');

exports.showRegister = (req, res) => res.render('auth/register');
exports.showLogin = (req, res) => res.render('auth/login');
exports.showForgot = (req, res) => res.render('auth/forgot');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const tokenValue = crypto.randomBytes(16).toString('hex');
    await Token.create({ user: user._id, token: tokenValue });
    const link = `${process.env.BASE_URL || 'http://localhost:3000'}/auth/verify/${tokenValue}`;
    await sendMail({
      to: user.email,
      subject: 'Bienvenido - Verifica tu cuenta',
      html: `<h1>Bienvenido</h1><p>Haz clic para verificar tu cuenta:</p><a href="${link}">${link}</a>`
    });
    req.flash('success', 'Usuario registrado. Revisa el email de bienvenida para verificar tu cuenta.');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/register');
  }
};

exports.verify = async (req, res) => {
  const tokenDoc = await Token.findOne({ token: req.params.token }).populate('user');
  if (!tokenDoc) return res.status(400).send('Token invalido o expirado');
  tokenDoc.user.verificado = true;
  await tokenDoc.user.save();
  await tokenDoc.deleteOne();
  res.send('Cuenta verificada correctamente');
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No existe usuario con ese email');
    return res.redirect('/forgot-password');
  }
  user.passwordResetToken = crypto.randomBytes(16).toString('hex');
  user.passwordResetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();
  const link = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password/${user.passwordResetToken}`;
  await sendMail({
    to: user.email,
    subject: 'Recupero de password',
    html: `<p>Recupera tu password aquí:</p><a href="${link}">${link}</a>`
  });
  req.flash('success', 'Se envio email de recuperacion');
  res.redirect('/login');
};

exports.apiLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ error: 'Credenciales incorrectas' });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'jwtsecret', { expiresIn: '1h' });
  res.json({ token });
};
