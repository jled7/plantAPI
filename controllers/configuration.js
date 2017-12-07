const mongoose = require('mongoose')
const configuration = require('../models/configuration')

async function isInitialized(callback) {
    let query = configuration.find({})
    let config = await query.exec()
    if(config === [] || config[0].initialized === false)
        return false
    else
        return true
    
}

module.exports = {
    isInitialized
}