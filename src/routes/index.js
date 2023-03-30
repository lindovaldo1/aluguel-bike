const { Router } = require('express')

const userRoutes = require('./userRoutes')
const bikeRoutes = require('./bikeRoutes')

module.exports = app => {
    app.use(userRoutes, bikeRoutes)
}