const bcrypt = require("bcrypt");
const axios = require("axios");
const User = require("../models/User");

// REGISTRO
async function register(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Usuario creado",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login correcto",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// FACEBOOK
async function facebookAuth(req, res) {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Falta accessToken" });
    }

    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );

    const profile = response.data;

    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = await User.create({
        first_name: profile.name || "Facebook User",
        email: profile.email || `fb_${profile.id}@facebook.com`,
        facebookId: profile.id,
        verified: true
      });
    }

    res.json({
      message: "Token de Facebook validado correctamente",
      user
    });
  } catch (error) {
    res.status(401).json({
      message: "Token de Facebook inválido"
    });
  }
}

module.exports = {
  register,
  login,
  facebookAuth
};