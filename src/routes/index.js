const { Router } = require('express')

const userRoutes = require('./userRoutes')
const bikeRoutes = require('./bikeRoutes')
const rentRoutes = require('./rentRoutes')

module.exports = app => {
    app.use( userRoutes, bikeRoutes, rentRoutes )
}