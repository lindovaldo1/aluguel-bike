const { Router } = require('express')
const controller = require('../controller/rentController')

const routes = Router()
const uri = '/rents'

routes
   .get(`${uri}/`, controller.getAll)
   .get(`${uri}/:id`,controller.getById)
   .get(`${uri}/user/:id`,controller.getUserById)
   .post(`${uri}/`, controller.create)
   .put(`${uri}/:id`,controller.update)
   .delete(`${uri}/:id`,controller.delete)

module.exports = routes