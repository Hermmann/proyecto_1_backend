const pedidoController = require('../controllers/pedido_controller');
const Router = require('express');
const routerPedido = Router();

routerPedido.post(`/api/pedido/register`, pedidoController.createPedido);
routerPedido.get(`/api/pedido`, pedidoController.getPedidoById);

module.exports = routerPedido;