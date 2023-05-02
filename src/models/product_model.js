const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    categoria: { type: mon},
    
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", productSchema);



const usuario = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    followers: [{type: mongoose.Schema.ObjectId, ref: 'Usuario' }],
    following: [{type: mongoose.Schema.ObjectId, ref: 'Usuario' }],
  });
     
