// Sketch routes
const
    express = require('express'),
    sketchRouter = new express.Router(),
    Sketch = require('../models/Sketch.js')

// Get all sketches
sketchRouter.get('/sketches', (req, res) => {
    Sketch.find({}, (err, allSketches) => {
        if(err) return console.log(err)
        res.json(allSketches)
    })
})
// Get specific sketch
sketchRouter.get('/sketches/:id', (req, res) => {
    Sketch.findById(req.params.id, (err, thatSketch) => {
        if(err) return console.log(err)
        res.json(thatSketch)
    })
})
// Create new sketch
sketchRouter.post('/sketches', (req, res) => {
    Sketch.create(req.body, (err, newSketch) => {
        if(err) return console.log(err)
        res.json({message: "Sketch created! 🐲", sketch: newSketch})
    })
})

// Edit sketch?🧐


// Delete a specific sketch
sketchRouter.delete('/sketches/:id', )


module.exports = sketchRouter