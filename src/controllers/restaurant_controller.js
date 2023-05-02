const Restaurant = require("../models/restaurant_model");

const createRestaurant=async(req,res)=>{
    try {
        const {nombre,categoria}=req.body;
        //console.log("body");
        const restaurant =new Restaurant({
            nombre,
            categoria,
        });
        console.log("antes del await");
        await restaurant
        .save().then((data)=>
        res.status(200).json({data,
        })
        )
        .catch((err)=>res.json(err));

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getRestaurant = async (req, res) => {
    try {
        const {_id} = req.body;
        const {id_restaurant} = req.query;

        if(id_restaurant !== undefined){
            let restaurant = (await Restaurant.findById(id_restaurant));
            if(restaurant==null){
                return res.status(404).json({msg: "No existe el restaurante"});
        }
        return res.status(200).json({restaurant});
        }

        res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    }catch(error){
        res.status(500).json({ msg: "Error en el servidor" });
    }


};

const getCategoria = async (req, res) => {
    try {
        const{categoria} = req.query;

        if(categoria !== undefined ){
            let restaurant = (await Restaurant.find({categoria: categoria}));

            return res.status(200).json({restaurant});
        }

        res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    
    } catch (error) {
        
    }

    
};

let updateRestaurant = async (req, res) => {
    try {
        const {nombre, categoria} = req.body;
        const {id_restaurant} = req.query;
        console.log("reertr",categoria);
        
            const restaurant = (await Restaurant.updateOne(
                {_id:id_restaurant},
                {
                    nombre,
                    categoria,
                },
                {new: true}
                )) || null;

            if (restaurant === null) {
                return res.status(500).json({ msg: "Error actualiza restaurante " });
            };
             
            res.status(200).json(restaurant)
            }catch (error) {
                res.status(500).json({ msg: "Error en el servidor" });
            }

};

const deleteRestaurant = async (req, res) => {
    try {
        const {id_restaurant} = req.query;
        const restaurant = (await Restaurant.deleteOne({_id:id_restaurant})) || null;

        if (restaurant === null) {
            return res.status(500).json({ msg: "Error al eliminar restaurante " });
        };
         
            res.status(200).json(restaurant)
        }catch (error) {
            res.status(500).json({ msg: "Error en el servidor" });
        }

};

module.exports = {
    createRestaurant,
    getRestaurant,
    getCategoria,
    updateRestaurant,
    deleteRestaurant,
  };