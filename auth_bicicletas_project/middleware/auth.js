const jwt = require('jsonwebtoken');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  req.flash('error', 'Debes iniciar sesion');
  return res.redirect('/login');
}

function verifyJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');
    req.jwtUser = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
}

module.exports = { ensureAuthenticated, verifyJwt };
