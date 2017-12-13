const app = require('../server')

const chai = require('chai')
const chaiHttp = require('chai-http')

global.expect = chai.expect
global.should = chai.should()

const plant = require('../models/plant')

var TOKEN
var plantID

describe('Testing básico del panel de administración', () => {
    before((done) => {
        plant.remove({}, () => {
            // console.log("Database dropped")
        })
        chai.request(app)
            .post('/api/login')
            .send({
                password: "test1234"
            })
            .end((err, res) => {
                TOKEN = res.body.token
                done()
            })
    })
    
    it('No deberíamos poder acceder a las funciones de administración sin usar el token de sesión', (done) => {
        chai.request(app)
            .get('/api/plants')
            .end((err, res) => {
                let resjson = JSON.parse(res.text)
                resjson.error.should.be.equal("Unauthorized")
                resjson.status.should.be.equal(401)
                done()
            })
    })
    it("Deberíamos poder acceder a las funciones de administración usando el token de sesión", (done) => {
        chai.request(app)
        .get('/api/plants?token='+TOKEN)
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(200)
            done()
        })
    })

    it("Debería devolvernos una lista vacia de plantas al no existir ninguna aun", (done) => {
        chai.request(app)
        .get('/api/plants?token='+TOKEN)
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(200)
            res.body.plants.should.be.empty
            done()
        })
    })

    it("Deberíamos poder agregar un set de plantas nuevo {name: Plant_1}", (done) => {
        chai.request(app)
        .post('/api/plants?token='+TOKEN)
        .send({
            name: "Plant_1",
            description: "Plant set description",
            servo: 1
        })
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(200)
            res.body.data.should.not.be.empty
            plantID = res.body.data._id
            done()
        })
    })

    it("No deberíamos poder agregar un set de plantas con un mismo nombre {name: Plant_1}", (done) => {
        chai.request(app)
        .post('/api/plants?token='+TOKEN)
        .send({
            name: "Plant_1",
            description: "Plant set description",
            servo: 1
        })
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(500)
            expect(res.body.error.errmsg.indexOf('duplicate key error')).to.not.be.equal(-1)
            done()
        })
    })

    it("No deberíamos poder agregar un set de plantas al mismo servo {servo: 1}", (done) => {
        chai.request(app)
        .post('/api/plants?token='+TOKEN)
        .send({
            name: "Plant_2",
            description: "Plant set description",
            servo: 1
        })
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(500)
            expect(res.body.error.errmsg.indexOf('duplicate key error')).to.not.be.equal(-1)
            done()
        })
    })
    
    it("No debería poder eliminar un set de plantas sin pasar un ID", (done) => {
        chai.request(app)
        .delete('/api/plant?token='+TOKEN)
        .end((err, res) => {
            expect(err).to.not.be.null
            res.status.should.be.equal(404)
            done()
        })
    })

    it("No debería poder eliminar un set de plantas con un ID incorrecto", (done) => {
        chai.request(app)
        .delete('/api/plant/aaaa?token='+TOKEN)
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(404)
            res.body.error.should.be.equal('Not Found')
            done()
        })
    })

    it("Deberíamos poder cambiar el set de plantas creado anteriormente", (done) => {
        chai.request(app)
        .patch('/api/plant/'+plantID+'?token='+TOKEN)
        .send({
            name: "Plant_2",
            description: "Plant set description",
            servo: 2
        })
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(200)
            res.body.message._id.should.be.equal(plantID)
            res.body.message.name.should.be.equal("Plant_2")
            res.body.message.servo.should.be.equal(2)
            done()
        })
    })

    it("No deberíamos poder cambiar el ID del set de plantas creado anteriormente", (done) => {
        chai.request(app)
        .patch('/api/plant/'+plantID+'?token='+TOKEN)
        .send({
            _id: "testID"
        })
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(500)
            res.body.error.should.be.equal("Cant update object ID")
            done()
        })
    })

    it("Deberiamos poder eliminar el set de plantas creado anteriormente", (done) => {
        chai.request(app)
        .delete('/api/plant/'+plantID+'?token='+TOKEN)
        .end((err, res) => {
            expect(err).to.be.null
            res.status.should.be.equal(200)
            res.body.should.be.an('Object')
            res.body.status.should.be.equal(200)
            done()
        })
    })
})