const moongose = require('mongoose');

const restaurantSchema = new moongose.Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true}
});



module.exports = moongose.model("Restaurant", restaurantSchema);
