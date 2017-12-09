const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const config = require('config')

const configuration = require('../controllers/configuration')

router.get('/', (req, res) => res.sendStatus(401))

// Inicializado status: 200
// Sin inicializar status: 204 (No content)
router.get('/connection', async (req, res) => {
    let answer,status
    try {
        answer = await configuration.isInitialized()
    } catch(err) {
        answer = false
    }
    
    status = answer?"200":"204"
    res.json({
        'status': status,
        'message': 'PlantAPI v' + config.VERSION, 
    })
})

module.exports = router