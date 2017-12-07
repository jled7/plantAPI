const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const config = require('config')

const configuration = require('../controllers/configuration')

router.get('/', (req, res) => res.sendStatus(401))

// Inicializado status: 200
// Sin inicializar status: 204 (No content)
router.get('/connection', (req, res) => {
    let answer,status
    configuration.isInitialized().then((answer) => {
        let status = answer?"200":"204"
        res.json({
            'status': status,
            'message': 'PlantAPI v' + config.VERSION, 
        })
    })
})

module.exports = router