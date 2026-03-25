// require("newrelic");
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectMongo = require("./config/mongo");

require("./config/passport");

const authRoutes = require("./routes/auth.routes");

const app = express();

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

module.exports = app;