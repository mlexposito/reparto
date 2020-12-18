const mongoose = require('mongoose')
const { Schema } = mongoose

const NewspaperPropsSchema = new Schema({
    name: { type: String, required: true},
    color: String
})

const NewspaperPropsModel = mongoose.model('NewspaperProps', NewspaperPropsSchema)

module.exports = NewspaperPropsModel