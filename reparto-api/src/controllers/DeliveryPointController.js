const DeliveryPoint = require('../models/DeliveryPoint')
const NewspaperProps = require('../models/NewspaperProps')

// add delivery point
exports.add = ( request, response) => {
    let delivery_point = new DeliveryPoint(request.body)
    delivery_point.save()
    .then(() => {
        response.status(200).json(delivery_point)
    })
    .catch((error) => {
        response.status(400).json(error)
    })
}

// get all delivery points
exports.get = ( request, response ) => {
    DeliveryPoint
        .find({})
        .populate({path : 'newspapers.props'})
        .sort('order')
        .exec()
        .then((docs) => {
            response.status(200).json(docs)
        })
        .catch((error) => response.status(400).json(error))
}

// get one delivery point
exports.getById = (request, response) => {
    DeliveryPoint
        .findById(request.params.id)
        .populate({path: 'newspapers.props' })
        .then(doc => {
            response.status(200).json(doc)
        })
        .catch((error) => response.status(400).json(error))
}

// update a delivery point
exports.update = (request, response) => {
    request.body.updatedAt = Date.now()
    DeliveryPoint.updateOne({ _id: request.params.id}, request.body)
        .then((doc) => {
            response.status(200).json(doc)
        })
        .catch((error) => response.status(400).json(error))
}

// delete delivery point
exports.delete = ( request, response) => {
    DeliveryPoint.deleteOne({ _id: request.params.id })
        .then(doc => {
            response.status(200).json(doc)
        })
        .catch((error) => response.status(400).json(error))
}

// bulk order delivery points
exports.order = (request, response) => {
    const bulkOrderOps = request.body.map( el => ({
        updateOne: {
            filter: { _id: el._id },
            update: { order: el.order}
        }
    }))

    console.log(JSON.stringify(bulkOrderOps))

    DeliveryPoint.bulkWrite(bulkOrderOps)
        .then(res => {
            response.status(200).json(res)
        })
        .catch((error) => response.status(400).json(error))
}