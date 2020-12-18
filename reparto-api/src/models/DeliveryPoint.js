const mongoose = require('mongoose')
const NewspaperPropsSchema = require('./NewspaperProps')
const { Schema } = mongoose

const NewspaperSchema = new Schema({
    name: { type: String, required: true },
    quantity: Number,
    dayOfWeek: [Number],
    holidays: Boolean,
    active: Boolean
}, {
    toJSON: { virtuals: true}
})

NewspaperSchema.virtual( 'props', {
    ref: 'NewspaperProps',
    localField: 'name',
    foreignField: 'name',
    justOne: true
})

const DeliveryPointSchema = new Schema({
    order: Number,
    address : { type: String, required: true },
    newspapers: [NewspaperSchema],
    description: String,
    geoLocation: String,
    active: Boolean,
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
}) 

const DeliveryPointModel =  mongoose.model('DeliveryPoint', DeliveryPointSchema)

module.exports = DeliveryPointModel