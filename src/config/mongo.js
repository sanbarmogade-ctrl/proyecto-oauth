const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/proyecto_oauth");
    console.log("MongoDB conectado 🟢");
  } catch (error) {
    console.error("Error conectando Mongo ❌", error.message);
  }
}

module.exports = connectMongo;