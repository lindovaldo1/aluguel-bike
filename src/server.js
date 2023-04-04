const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
var cors = require('cors');

require('./database')
const app = express()

app.use(bodyParser.json())
app.use(cors())

routes(app)

app.listen(3000, () => {
    console.log("server is running.")
})

module.exports = app