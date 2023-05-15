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
        const { id_pedido } = req.query;
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

const getPedidos = async (req, res) => {
    try {   //terminar este endpoint que no lo entiendo del todo
        const { id_user, id_restaurant, fecha_inicio, fecha_fin } = req.query;
        let pedidos = {};// este es el objeto json llamado pedidos

        if (id_user !== undefined) {

            const user = await User.findById(id_user);

            if (user.rol === "cliente") {

                let array_pedidos = [];
                for (let index = 0; index < user.pedidos.length; index++) {
                    const p = await Pedido.findById(user.pedidos[index]);//aquí va a buscar en el array de pedidos en el modelo de usuario en base al id de los pedidos
                    //para luego ir al modelo de pedidos y buscar el pedido con ese id mostrando toda su información
                    array_pedidos.push(p);
                }
                pedidos.pedidos_cliente = array_pedidos;
            }

            if (user.rol === "domiciliario") {
                let array_pedidos = [];
                for (let index = 0; index < user.pedidos.length; index++) {
                    const p = await Pedido.findById(user.pedidos[index]);
                    array_pedidos.push(p);
                }
                pedidos.pedidos_domiciliario = array_pedidos;
            }


        }
        if (id_restaurant !== undefined) {
            pedidos.list_pedidos_restaurant = await Pedido.find({ idrestaurant: id_restaurant });

        }
        if ((fecha_inicio !== undefined) && (fecha_fin !== undefined) ) {
           console.log(new Date (fecha_inicio));
            pedidos.list_pedidos_restaurant = await Pedido
            .find(
                { idrestaurant: id_restaurant , fecha: { $gte: new Date(fecha_inicio), $lte: new Date (fecha_fin) } });
        }

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getPedidoSinAceptar = async (req, res) => {
    try {
        const pedidos_sin_aceptar = await Pedido.find({ estado: false });
        res.json(pedidos_sin_aceptar);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
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
    getPedidos,
    getPedidoSinAceptar,
    deletePedido,
};