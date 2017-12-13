const plant = require('../models/plant')


function getPlants(req, res) {
    let query = plant.find({})
    query.exec((err, plants) => {
        if(err) {
            return res.json({
                status: 500,
                error: err
            })
        } else {
            res.json({
                status: 200,
                plants
            })
        }
        
    })
}

function postPlant(req, res) {
    let newPlant = new plant(req.body)
    newPlant.save((err, plant) => {
        if(err)
            return res.json({
                status: 500,
                error: err
            })
        res.json({
            status: 200,
            data: plant
        })
    })
}

function patchPlant(req, res) {
    plant.findById(req.params.id, (err, plantEdited) => {
        if(err) {
            if(err.name === "CastError")
                return res.json({
                    status: 404,
                    error: "Not Found"
                })
            return res.json({
                status: 500,
                error: err
            })
        }
        for(var index in req.body) {
            if(index === "_id") {
                return res.json({
                    status: 500,
                    error: "Cant update object ID"
                })
            }
            plantEdited[index] = req.body[index]
        }
        plantEdited.save((err, result) => {
            if(err)
                return res.json({
                    status: 500,
                    error: err
                })
            res.json({
                status: 200,
                message: result
            })
        })
    })
}

function deletePlant(req, res) {
    plant.findById(req.params.id, (err, plantDeleted) => {
        if(err) {
            if(err.name === "CastError")
                return res.json({
                    status: 404,
                    error: "Not Found"
                })
            return res.json({
                status: 500,
                error: err
            })
        }    
        plantDeleted.remove((err, result) => {
            if(err)
                return res.json({
                    status: 500,
                    error: err
                })
            res.json({
                status: 200,
                message: result
            })
        })
    })
}

module.exports = {
    getPlants,
    postPlant,
    patchPlant,
    deletePlant
}