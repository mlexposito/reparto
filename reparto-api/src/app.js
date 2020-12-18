require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const router = require('./router')
const cors = require('cors')

const app = express()

// configure cors
app.use(cors())

// configure body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// configure router
app.use('/api', router)

// launch app
module.exports = app.listen( process.env.PORT || 8080, () => {
    console.log('Running Reparto REST API')
})

