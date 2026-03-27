require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

require('./config/passport');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/red_bicicletas')
  .then(() => console.log('MongoDB conectada'))
  .catch(err => console.error('Error MongoDB:', err.message));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => res.render('index'));
app.use('/', require('./routes/web'));
app.use('/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/apiAuth'));
app.use('/api/bicicletas', require('./routes/bicicletasApi'));

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
}

module.exports = app;
