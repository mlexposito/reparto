const mongoose = require('mongoose')
require('dotenv').config({path: '.env.test'})

exports.mochaHooks = {
    beforeAll() {
        mongoose.connect(process.env.DB_CONN_STRING, { useNewUrlParser: true,  useUnifiedTopology: true })
        mongoose.connection
            .once('open', () => {
                mongoose.connection.collections.newspaperprops.drop()
                mongoose.connection.collections.deliverypoints.drop()
            })
            .on('error', (err) => console.warn('Error: ', err))
    },

    afterAll() {
        mongoose.connection.close()
        process.exit()
    }
}

