// Plant API

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require ('config')

const api = require('./routes/api')

const app = express()
//const DB_HOST = config.DB_HOST;

// Loading Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json'}))
app.use(morgan('combined'))

app.get("/", (req, res) => {
    res.end("<h1>This is not the API you are looking for</h1>")
})

app.use("/api", api)

app.listen(config.API_PORT, () => console.log("Server up at http://localhost:" + config.API_PORT))

module.exports = app; // Just for testing