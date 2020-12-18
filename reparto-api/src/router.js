let router = require('express').Router()
const DeliveryPointController = require('./controllers/DeliveryPointController')
const NewspaperController = require('./controllers/NewspaperController')

// set default api response
router.get('/', (req, res) => {
    res.json({
        name: 'Reparto API',
        version: '20.12.14'
    })
})

// set routes
router.route('/delivery-point')
    .post(DeliveryPointController.add)
    .get(DeliveryPointController.get)
    
router.route('/delivery-point/order')
    .put(DeliveryPointController.order)
    .patch(DeliveryPointController.order)

router.route('/delivery-point/:id')
    .get(DeliveryPointController.getById)
    .put(DeliveryPointController.update)
    .patch(DeliveryPointController.update)
    .delete(DeliveryPointController.delete)


router.route('/newspaper')
    .post(NewspaperController.add)
    .get(NewspaperController.get)

router.route('/newspaper/:id')
    .get(NewspaperController.getById)
    .put(NewspaperController.update)
    .patch(NewspaperController.update)
    .delete(NewspaperController.delete)


module.exports = router