const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../model/user')
const Bike = require('../model/bike')
const Rent = require('../model/rent')

const connection = new Sequelize(dbConfig)

User.init(connection)
Bike.init(connection)
Rent.init(connection)


module.exports = connection