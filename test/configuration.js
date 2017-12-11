const app = require('../server')

const chai = require('chai')
const chaiHttp = require('chai-http')

global.expect = chai.expect
global.should = chai.should()

const configuration = require('../models/configuration')

chai.use(chaiHttp)

describe("Testing Básico de Configuración", function() {
    before(() => {
        configuration.remove({}, ()=> {
            // console.log("Database dropped")
        })
    })
    it('Debería existir la aplicación', function() {
        expect(app).to.not.be.an('undefined')
    })

    it('Debería ser una instancia de API EXPRESS', () => {
        expect(app.EXPRESS_APP).to.be.true
        expect(app.settings['x-powered-by']).to.be.true
        expect(app.get).to.be.a('function')
        expect(app.post).to.be.a('function')
        expect(app.put).to.be.a('function')
        expect(app.delete).to.be.a('function')
    })
    
    it('Debería devolver el nombre de la API más la version', (done) => {
        chai.request(app)
            .get('/api/connection')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.message.split(' ')[0].should.be.eql('PlantAPI')
                done()
            })
    })

    it('Debería devolver un estado 204 al no encontrar configuracion', (done) => {
        chai.request(app)
            .get('/api/connection')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.status.should.be.eql(204)
                done()
            })
    })

    it('Debería poderse crear una configuración al no existir ninguna',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(200)
                res.body.data._id.should.not.be.null
                done()
            })
    })

    it('No debería poderse crear una configuración al ya existir una',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(501)
                expect(res.body.data).to.be.undefined
                done()
            })
    })

    it('Debería devolver un estado 200 al encontrar configuracion', (done) => {
        chai.request(app)
            .get('/api/connection')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.status.should.be.eql(200)
                done()
            })
    })

    it('Debería poder Autentificarse en el sistema {pass:test1234}', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({
                password: "test1234"
            })
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.status.should.be.eql(200)
                res.body.token.should.not.be.undefined
                done()
            })
    })
})

describe("Testing de validación de Configuración", function() {
    before(() => {
        configuration.remove({}, ()=> {
            // console.log("Database dropped")
        })
    })
    it('No debería poderse crear una configuración con nombre vacio',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(500)
                expect(res.body.error.message.indexOf('is required')).to.not.be.equal(-1)
                done()
            })
    })

    it('No debería poderse crear una configuración con nombre menor de 3 caracteres',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "te",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(500)
                expect(res.body.error.message.indexOf('allowed length')).to.not.be.equal(-1)
                done()
            })
    })

    it('No debería poderse crear una configuración con nombre mayor de 20 caracteres',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "testtesttesttesttesttest",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(500)
                expect(res.body.error.message.indexOf('allowed length')).to.not.be.equal(-1)
                done()
            })
    })

    it('No debería poderse crear una configuración con una contraseña menor que 8 caracteres (y mas de 20) y sin al menos un digito {pass:test}',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "test",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(500)
                expect(res.body.error.message.indexOf('password must be at least')).to.not.be.equal(-1)
                done()
            })
    })

    it('No debería poderse crear una configuración con una contraseña menor que 8 caracteres (y mas de 20) y sin al menos un digito {pass:testtesttesttesttesttest}',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "testtesttesttesttesttest",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(500)
                expect(res.body.error.message.indexOf('password must be at least')).to.not.be.equal(-1)
                done()
            })
    })

    it('Debería poderse crear una configuración con un nombre valido y una contraseña segura {pass:test1234}',(done) => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "test1234",
                location: "test",
                initialized: true
            }).end((err, res) => {
                expect(err).to.be.null
                res.status.should.be.equal(200)
                res.body.status.should.be.equal(200)
                expect(res.body.error).to.be.undefined
                done()
            })
    })


})