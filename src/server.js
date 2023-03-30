const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./database')
const app = express()

app.use(bodyParser.json())

routes(app)

app.listen(3000, () => {
    console.log("server is running.")
})

module.exports = app