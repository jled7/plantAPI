const express = require('express')
const router = express.Router()
const config = require('config')

router.get('/test', (req, res) => {
    res.end("OK")
})

module.exports = router