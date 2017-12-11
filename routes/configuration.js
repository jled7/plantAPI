const express = require('express')
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
    
    status = answer?200:204
    res.json({
        'status': status,
        'message': 'PlantAPI v' + config.VERSION, 
    })
})

// Mongoose error status: 500
// Multiple configuration error status: 501
router.post('/configurate', (req, res) => {
    configuration.isInitialized().then((ret) => {
        if(!ret) {
            configuration.createConfiguration(req, res)
        } else {
            res.json({
                status: 501,
                error: "Solo puede haber una configuración"
            })
        }       
    }).catch((err) => {
        console.log("UNKNOWN ERROR: " + err)
    })
})

router.post('/login', (req, res) => {
    configuration.isInitialized().then((ret) => {
        if(ret) {
            configuration.login(req, res)
        } else {
            res.json({
                status: 500,
                message: "Sin inicializar"
            })
        }
    }).catch((err) => {
        console.log("UNKNOWN ERROR: " + err)
    })
})

module.exports = router