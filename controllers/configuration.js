const configuration = require('../models/configuration')
const TOKEN = require('config').TOKEN
const jwt = require('jsonwebtoken')
const moment = require('moment')

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

function createConfiguration(req, res) {
    // Password Validation
    let regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
    if(!regex.test(req.body.password)) {
        return res.json({
            status: 500,
            error: {
                message: 'The password must be at least 8 characters, no more than 20 characters and must include at least one numeric digit.'
            }
        })
    }
    let config = new configuration(req.body)
    config.save((err, conf) => {
        if(err)
            return res.json({
                status: 500,
                error: err
            })
        res.json({
            status:200,
            data: conf
        })
    })
}

function login(req, res) {
    configuration.findOne({}, (err, config) => {
        if(err)
            return res.json({
                status: 500,
                error: err
            })
        if(req.body.password === undefined)
            return res.json({
                status: 500,
                error: "Password undefined"
            })
        if(!config.checkPassword(req.body.password)) {
            return res.json({
                status: 500,
                error: "Password do not match"
            })
        }
        var token = jwt.sign({id: config._id}, TOKEN, {expiresIn: moment().add(14, 'days').unix()})
        res.json({
            status: 200,
            token: token
        })
    })
    
}

module.exports = {
    isInitialized,
    createConfiguration,
    login
}