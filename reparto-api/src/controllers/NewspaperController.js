const NewspaperProps = require('../models/NewspaperProps')

// add newspaper
exports.add = ( request, response) => {
    let newspaper_props = new NewspaperProps(request.body)
    newspaper_props
        .save()
        .then(() => {
            response.status(200).json(newspaper_props)
        })
        .catch((error) => {
            response.status(400).json(error)
        })
}

// get newspapers
exports.get = ( request, response ) => {
    NewspaperProps
        .find({})
        .exec()
        .then((docs) => {
            response.status(200).json(docs)
        })
        .catch((error) => response.status(400).json(error))
}

// get a newspaper
exports.getById = (request, response) => {
    NewspaperProps.findById(request.params.id)
        .then(doc => {
            response.status(200).json(doc)
        })
        .catch((error) => response.status(400).json(error))
}

// update a newspaper
exports.update = (request, response) => {
    request.body.updatedAt = Date.now()
    NewspaperProps.updateOne({ _id: request.params.id}, request.body)
        .then((doc) => {
            response.status(200).json(doc)
        })
        .catch((err) => response.status(400).json(error))
}

// delete a newspaper
exports.delete = ( request, response) => {
    NewspaperProps.deleteOne({ _id: request.params.id })
        .then(doc => {
            response.status(200).json(doc)
        })
        .catch((error) => response.status(400).json(error))
}