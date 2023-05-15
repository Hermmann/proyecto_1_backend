const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
    {
        iduser: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
        id_delivery: { type: mongoose.Schema.ObjectId, ref: "User"},
        idrestaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant", require: true },
        idproduct: { type: mongoose.Schema.ObjectId, ref: "Product", require: true },
        cantidad: { type: Number, require: true },
        precio: { type: Number, require: true },
        estado: { type: Boolean, require: false},
        fecha: { type: Date, require: true },
        hora: { type: String, require: true },
        direccion: { type: String, require: true },

    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("Pedido", pedidoSchema);







