const { Router } = require('express')
const userController = require('../controller/userController')

const userRoutes = Router()
const uri = '/users'

userRoutes
   .get(`${uri}/`, userController.getAll)
   .get(`${uri}/:id`,userController.getById)
   .post(`${uri}/`, userController.create)
   .put(`${uri}/:id`,userController.update)
   .delete(`${uri}/:id`,userController.delete)

module.exports = userRoutes