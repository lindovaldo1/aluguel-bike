const { Router } = require('express')
const userController = require('../controller/userController')

const userRoutes = Router()

userRoutes
   .get('/', userController.getAll)
   .get('/:id',userController.getById)
   .post('/', userController.create)
   .put('/:id',userController.update)
   .delete('/:id',userController.delete)

module.exports = userRoutes