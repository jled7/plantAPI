const express = require('express')
const router = express.Router()
const config = require('config')

router.get('/', (req, res) => res.sendStatus(401))

// Inicializado status: 200
// Sin inicializar status: 204 (No content)
router.get('/connection', (req, res) => {
    res.json({
        'status': '204',
        'message': 'PlantAPI v' + config.VERSION, 
    })
})

module.exports = router