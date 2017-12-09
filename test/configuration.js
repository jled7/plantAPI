const app = require('../server')

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const should = chai.should()

describe("Testing Básico de Configuración", function() {
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
    
    it('Debería devolver el nombre de la API más la version', () => {
        chai.request(app)
            .get('/api/connection')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.message.split(' ')[0].should.be.eql('PlantAPI')
            })
    })

    it('Debería devolver un estado 204 al no encontrar configuracion', () => {
        chai.request(app)
            .get('/api/connection')
            .end((err, res) => {
                expect(err).to.be.null
                res.should.not.be.null
                res.body.should.be.a('Object')
                res.body.status.should.be.eql('204')
            })
    })

    it('Debería poderse crear una configuración al no existir ninguna',() => {
        chai.request(app)
            .post('/api/configurate')
            .send({
                name: "test",
                password: "test",
                location: "tolosa"
            }).end((err, res) => {
                console.log(res.body.status)
                expect(err).to.be.null
                res.body.should.be.a('Object')
                res.body.status.should.be.eql('200')
            })
    })
})