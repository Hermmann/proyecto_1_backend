const Product = require("../models/product_model");



const createProduct=async(req,res)=>{
    try {
        const {nombre,categoria}=req.body;
        //console.log("body");
        const product =new Product({
            nombre,
            categoria,
            idrestaurant:req.body.idrestaurant,
        });
        console.log("antes del await");
        await product
        .save().then((data)=>
        res.status(200).json({data,
        })
        )
        .catch((err)=>res.json(err));

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getProductbyId = async(req, res) => {
    try {
        const {id_product} = req.query;
        
        if (id_product != undefined) {
            let product = (await Product.findById(id_product));
            
            if(id_product === null){
                return res.status(404).json({msg: "No existe ese producto"});
        }
        return res.status(200).json({product});
        }
         res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }

};

const getProductbyRestaurantAndCategory = async(req, res) => {
    try {
        const {id_restaurant} = req.query;
        const {categorie} = req.query;
        console.log(id_restaurant);
        console.log(categorie);
        if (id_restaurant && categorie != undefined) {
            
            let productbyRestaurantAndCategory = (await Product.find({idrestaurant: id_restaurant , categoria:categorie}));
            
            if (id_restaurant === null && categoria === null) { // ver si mejoro esto
                return res.status(404).json({msg: "No existe ese restaurante y categoria"});
            }
            return res.status(200).json({productbyRestaurantAndCategory});
        }
        res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updateProduct = async(req, res) => {
    try {
        const {id_product} = req.query;
        const {nombre} = req.body;
        const {categoria} = req.body;
        console.log(id_product);
        if (id_product != undefined) {
            
            let product = (await Product.findById(id_product));
            if(id_product === null){
                return res.status(404).json({msg: "No existe ese producto"});
            }
            product.nombre = nombre;
            product.categoria = categoria;
            
            await product.save();
            return res.status(200).json({product});
        }
        res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const {id_product} = req.query;
        if (id_product != undefined) {
            let product = (await Product.findById(id_product));
            if(id_product === null){
                return res.status(404).json({msg: "No existe ese producto"});
            }
            await product.delete();
            return res.status(200).json({msg: "Producto eliminado"});
        }
        res
        .status(200)
        .json({msg: "No envio ningún parametro de busqueda válido"});
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

//await Restaurant.filter(r=> idrestaurant === r._id)

module.exports = {
    createProduct,
    getProductbyId,
    getProductbyRestaurantAndCategory,
    updateProduct,
    deleteProduct,
}