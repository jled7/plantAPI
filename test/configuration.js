const expect = require('chai').expect
const express = require('express')

const app = require('../server')

describe("Testing Básico", function() {
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
})