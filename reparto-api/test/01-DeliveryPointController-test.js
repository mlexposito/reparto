const request = require('supertest')
const assert = require('assert')
const app = require('../src/app')

describe('Delivery Point Controller tests:', () => {

    // variable to save the new delivery point id to test getById and delete methods
    let id = ''

    // object to try tests
    const deliveryPointJSON = {
        address : 'Rua Dona Urraca 57, 4C',
        newspapers : [
            {
                name: 'Voz',
                dayOfWeek: [0,1,2,3,4,5,6],
                holidays: true,
                active: true
            },
            {
                name: 'As',
                dayOfWeek: [0,6],
                holidays: true,
                active: true
            },
        ],
        description : 'Llave portal, Buzon',
        geolocation : '',
        active : true            
    }

    // add method
    describe('Test add method:', () => {

        it('Should create a new delivery point', (done) => {
            request(app)
                .post('/api/delivery-point')
                .send(deliveryPointJSON)
                .set('Content-Type', 'application/json')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    id = res.body._id
                    done()
                })
        })

        it('Should return a error when try to create an invalid delivery point', (done) => {
            request(app)
                .post('/api/delivery-point')
                .send({})
                .set('Content-Type', 'application/json')
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })

    })

    // get methods
    describe('Test get methods:', () => {

        it('Should return all delivery points', (done) => {
            request(app)
                .get('/api/delivery-point')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })

        it('Should return a delivery point by id', (done) => {
            request(app)
                .get('/api/delivery-point/' + id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })

    // Update method
    describe('Test update methods:', () => {
        it('Should update a delivety point by id', (done) => {
            request(app)
                .put('/api/delivery-point/' + id)
                .send({noexists: true})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })

    // Order
    describe('Test order methods:', () => {
        it('should reorder delivery points', (done) => {
            request(app)
                .put('/api/delivery-point/order')
                .send([{ 'id': id, order: 5}])
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })

        it('should return new order to the element', (done) => {
            request(app)
                .get('/api/delivery-point/' + id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    assert.strictEqual(res.body.order,5)
                    done()
                })
        })

    })

    // Delete method
    describe('Test delete methods:', () => {
        it('Should delete a delivery point by id', (done) => {
            request(app)
                .delete('/api/delivery-point/' + id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })


})
