const userController = require("../controllers/user_controller")
const Router = require("express")
const routerUser = Router()

routerUser.post(`/api/user/register`, userController.registerUser)
routerUser.get(`/api/user`, userController.getUser)
routerUser.put(`/api/user`, userController.updateUser)
routerUser.delete(`/api/user`, userController.deleteUser)

module.exports = routerUser;