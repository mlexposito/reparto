const request = require('supertest')
const app = require('../src/app')

describe('Newspapers Controller tests:', () => {

    // variable to save the new newspaper id to test getById and delete methods
    let id = ''

    // object to try tests
    const newspapersJSON = {
        name: 'Voz',
        color: 'red'
    }

    // add method
    describe('Test add method:', () => {

        it('Should create a new newspaper', (done) => {
            request(app)
                .post('/api/newspaper')
                .send(newspapersJSON)
                .set('Content-Type', 'application/json')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    id = res.body._id
                    done()
                })
        })

        it('Should return a error when try to create an invalid newspaper', (done) => {
            request(app)
                .post('/api/newspaper')
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

        it('Should return all newspapers', (done) => {
            request(app)
                .get('/api/newspaper')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })

        it('Should return a newspaper by id', (done) => {
            request(app)
                .get('/api/newspaper/' + id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })

    // Update method
    describe('Test update methods:', () => {
        it('Should update a newspaper by id', (done) => {
            request(app)
                .put('/api/newspaper/' + id)
                .send({color: 'green'})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })

    // Delete method
    describe('Test delete methods:', () => {
        it('Should delete a newspaper by id', (done) => {
            request(app)
                .delete('/api/newspaper/' + id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    done()
                })
        })
    })

})
