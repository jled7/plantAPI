const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

const app = require('../server')

describe("Testing Básico de Configuración", function() {
    it('Debería existir la aplicación', function() {
        expect(app).to.not.be.an('undefined')
    })
    it('Debería ser una instancia de API EXPRESS', () => {
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
})