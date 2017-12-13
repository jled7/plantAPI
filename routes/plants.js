const express = require('express')
const router = express.Router()
const config = require('config')

const plant = require('../controllers/plant.js')

router.get('/plants', plant.getPlants)

router.post('/plants', plant.postPlant)

router.patch('/plant/:id', plant.patchPlant)

router.delete('/plant/:id', plant.deletePlant)

module.exports = router