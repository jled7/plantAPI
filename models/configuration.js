let mongoose = require('mongoose')

let Schema = mongoose.Schema

let configurationSchema = new Schema({
    name: {type:String, required: true},
    initialized: {type: Boolean, required: true},
    password: {type:String, required: true},
    location: {type:String, required: true}
})

module.exports = mongoose.model('configuration', configurationSchema)