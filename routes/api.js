const express = require('express')
const router = express.Router()
const config = require('config')

router.get('/', (req, res) => res.sendStatus(401))

router.get('/connection', (req, res) => {
    res.json({
        'status': '200',
        'message': 'PlantAPI Ver '+config.VERSION, 
    })
})

module.exports = router