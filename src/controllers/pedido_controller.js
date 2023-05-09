const Pedido = require("../models/pedido_model");
const User = require("../models/user_model");

const createPedido = async (req, res) => {
    try {
        const { 
            iduser, 
            idrestaurant, 
            idproduct, 
            cantidad, 
            precio, 
            estado, 
            fecha, 
            hora, 
            direccion } = req.body;

        const pedido = new Pedido({
            iduser,
            idrestaurant,
            idproduct,
            cantidad,
            precio,
            estado,
            fecha,
            hora,
            direccion,
        });
        await pedido
            .save().then((data) =>
                res.status(200).json({
                    data,
                })
            )
            .catch((err) => res.json(err));
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
        
    };

    const getPedidoById = async (req, res) => {
        try {
            const {id_pedido} = req.query;
            if (id_pedido != undefined) {
                const pedido = await Pedido.findById(id_pedido);   
                if (pedido === null) {
                    res.status(400).json({ msg: "No existe el pedido" });
                }
                 return res.status(200).json({ pedido });   
                }
                res.status(200).json({ msg: "No envio un parametro de busqueda válido" });
            } catch (error) {
            res.status(500).json({ msg: "Error en el servidor" });
        }
    };

    const getPedidoByUser = async (req, res) => {
        try {   //terminar este endpoint que no lo entiendo del todo
            const {id_user} = req.query;
            const {rol} = req.query;
            const {id_restaurant} = req.query;
            if (id_user != undefined) {

             //    let user = (await User.find({iduser: id_user , rol: rol}));
               //      rol === "user" ?  (await Pedido.find({iduser: u}))
            } 
                    
                
            }catch (error) {

        }
    };

    const deletePedido = async (req, res) => {
        try {
            const { id_pedido } = req.query;
            if (id_pedido != undefined) {
                const pedido = await Pedido.findByIdAndDelete(id_pedido);
                if (pedido === null) {
                    res.status(400).json({ msg: "No existe el pedido" });
                }
                return res.status(200).json({ msg: "Pedido eliminado" });
            }
            res.status(200).json({ msg: "No envio un parametro de busqueda válido" });
        } catch (error) {
            res.status(500).json({ msg: "Error en el servidor" });
        }
    };



    module.exports = {
        createPedido,
        getPedidoById,
        deletePedido,
    };