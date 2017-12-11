let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let Schema = mongoose.Schema

let configurationSchema = new Schema({
    name: {type:String, required: true, unique: true, minlength:3, maxlength:20},
    initialized: {type: Boolean, required: true},
    password: {type:String, required: true},
    location: {type:String, required: true}
})

/*configurationSchema.path('password').validate((password) => {
    let regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
    return regex.test(password)
}, 'The password must be at least 8 characters, no more than 20 characters and must include at least one numeric digit.')*/

// Hashed Password
configurationSchema.pre('save', function(next) {
    let user = this
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

configurationSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('configuration', configurationSchema)