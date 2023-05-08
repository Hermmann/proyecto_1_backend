const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    email:{ type: String, require: true,unique:true },
    celular: { type: String, require: true},
    contraseña:{ type: String, require: true},
    direccion: { type: String, require: true },
    rol: { type: String, require: true },
    pedidos: [{type: mongoose.Schema.ObjectId, ref: "pedido",},],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);