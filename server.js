// Plant API

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require ('config')

const apiConfiguration = require('./routes/configuration')

const app = express()
//const DB_HOST = config.DB_HOST;

let mongoDB = config.DB_HOST+'/'+config.DB_PLANT
mongoose.Promise = global.Promise
mongoose.connect(mongoDB, {
    useMongoClient: true
});
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

if(process.env.NODE_ENV === 'test') {
    app.EXPRESS_APP = true
    module.exports = app; // Just for testing
} else {
    app.listen(config.API_PORT, () => console.log("Server up at http://localhost:" + config.API_PORT))
}