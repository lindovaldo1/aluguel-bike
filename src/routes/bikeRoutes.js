const { Router } = require('express')
const controller = require('../controller/bikeController')

const routes = Router()
const uri = '/bikes'

routes
   .get(`${uri}/`, controller.getAll)
   .get(`${uri}/:id`,controller.getById)
   .post(`${uri}/`, controller.create)
   .put(`${uri}/:id`,controller.update)
   .delete(`${uri}/:id`,controller.delete)

module.exports = routes