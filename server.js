// Plant API

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require ('config')
const jwt = require('jsonwebtoken')

const apiConfiguration = require('./routes/configuration')
const apiPlants = require('./routes/plants')

process.env.NODE_ENV = 'dev'

const app = express()

// Access-Control-Allow-Origin
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', config.ACCESS_CONTROL_ALLOW_ORIGIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
})


let mongoDB = config.DB_HOST+'/'+config.DB_PLANT
mongoose.Promise = global.Promise
mongoose.connect(mongoDB, {
    useMongoClient: true
}).catch((err) => {
    console.log("Mongo Error: " +err)
    process.exit
})
const db = mongoose.connection
if(process.env.NODE_ENV !== 'test') {
    db.on('connected', () => {
        console.log("Connected to "+ mongoDB)
    })
}

// Loading Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json'}))

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
}

app.get("/", (req, res) => {
    res.end("<h1>This is not the API you are looking for</h1>")
})

app.use("/api", apiConfiguration)


// Authentication middleware
app.use("/api", (req, res, next) => {
    if(req.query.token === undefined) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized"
        })
    }
    jwt.verify(req.query.token, config.TOKEN, function(err, token) {
        if(err) 
            return res.status(401).json({
                status: 401,
                error: "Wrong token"
            })
        next()
    })
})

app.use("/api", apiPlants)

if(process.env.NODE_ENV === 'test') {
    app.EXPRESS_APP = true
    module.exports = app; // Just for testing
} else {
    app.listen(config.API_PORT, () => console.log("Server up at http://localhost:" + config.API_PORT))
}