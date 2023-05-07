const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    categoria: { type: String, require: true },
    idrestaurant: { type: mongoose.Schema.ObjectId, ref: "Restaurant", require: true },
   

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Product", productSchema);


// const mongoose = require("mongoose")

// const storySchema = new mongoose.Schema(
//   {
//     name: { type: String, require: true },
//     iduser: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
//     multimedia: { type: String, require: true },
//     idsubject:{type: mongoose.Schema.ObjectId,
//       ref: 'Subject',},//TODO:Especificar tipo de dato
//       idcomment_list: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: 'Comment',
//       },
//     ],
//   },
//   {
//     versionKey: false,
//   }

// )

// module.exports = mongoose.model('Story', storySchema)





