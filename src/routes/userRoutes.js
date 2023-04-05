const { Router } = require('express')
const controller = require('../controller/userController')

const routes = Router()
const uri = '/users'

routes
   .get(`${uri}/`, controller.getAll)
   .get(`${uri}/:id`,controller.getById)
   .post(`${uri}/`, controller.create)
   .put(`${uri}/:id`,controller.update)
   .delete(`${uri}/:id`,controller.delete)
   .post(`${uri}/login`, controller.getLogin)

module.exports = routes