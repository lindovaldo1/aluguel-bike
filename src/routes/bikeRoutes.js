const { Router } = require('express')
const bikeController = require('../controller/bikeController')

const bikeRoutes = Router()
const uri = '/bikes'

bikeRoutes
   .get(`${uri}/`, bikeController.getAll)
   .get(`${uri}/:id`,bikeController.getById)
   .post(`${uri}/`, bikeController.create)
   .put(`${uri}/:id`,bikeController.update)
   .delete(`${uri}/:id`,bikeController.delete)

module.exports = bikeRoutes