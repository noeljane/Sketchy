// Sketch routes
const
    express = require('express'),
    sketchRouter = new express.Router()

sketchRouter.get('/sketchs', (req, res) => {
    Sketch.find({}, (err, allSketches) => {
        if(err) return console.log(err)
        res.json(allSketches)
    })
})

sketchRouter.get('/sketches/:id', (req, res) => {
    Sketch.findById(req.params.id, (err, thatSketch) => {
        if(err) return console.log(err)
        res.json(thatSketch)
    })
})




module.exports = sketchRouter