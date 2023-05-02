const restaurantController = require("../controllers/restaurant_controller")
const Router = require("express")
const routerRestaurant = Router()


routerRestaurant.post(`/api/restaurant/register`, restaurantController.createRestaurant);
routerRestaurant.get(`/api/restaurant`, restaurantController.getRestaurant);
routerRestaurant.get(`/api/restaurant/categoria`, restaurantController.getCategoria);
routerRestaurant.put(`/api/restaurant`, restaurantController.updateRestaurant);
routerRestaurant.delete(`/api/restaurant`, restaurantController.deleteRestaurant);

module.exports = routerRestaurant;