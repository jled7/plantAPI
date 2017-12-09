const mongoose = require('mongoose')
const configuration = require('../models/configuration')

async function isInitialized() {
    let query = configuration.find({})
    let config = await query.exec()
    if(config[0] == undefined) {
        return false
    } else {
        if(config[0].initialized == false) {
            return false
        } else {
            return true
        }
    }
}

module.exports = {
    isInitialized
}