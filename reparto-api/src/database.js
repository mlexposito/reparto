const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_CONN_STRING, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection

db.once('open', () => {
    console.log('Database connection open')
})
.on('error', (err) => {
    console.warn('Database error:', err)
})

module.exports = db