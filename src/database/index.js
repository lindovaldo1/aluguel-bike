const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../model/User')
const Bike = require('../model/Bike')

const connection = new Sequelize(dbConfig)

User.init(connection)
Bike.init(connection)

module.exports = connection