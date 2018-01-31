// Sketch routes
const
    express = require('express'),
    sketchRouter = new express.Router(),
    Sketch = require('../models/Sketch.js')

// Get all sketches
sketchRouter.get('/sketches', (req, res) => {
    Sketch.find({}, (err, allSketches) => {
        if(err) return console.log(err)
        // var imageArray =[]
        // allSketches.forEach(function(s){
        //     imageArray.push(s.imgUrl)
        // })
        //res.json(allSketches)
        res.render('sketches/indexsketches', {sketches: allSketches})
    })
})

// Form to create new sketch
sketchRouter.get('/sketches/new', (req, res) => {
    res.render('canvas')
})

// Get specific sketch
sketchRouter.get('/sketches/:id', (req, res) => {
    Sketch.findById(req.params.id, (err, thatSketch) => {
        if(err) return console.log(err)
        //res.json(thatSketch)
        res.render('sketches/showsketches', {title: "This sketch", sketch:thatSketch})
    })
})



// Create new sketch
sketchRouter.post('/sketches', (req, res) => {
    console.log("Incoming image YAYYY!")
    console.log(req.body)
    Sketch.create(req.body, (err, newSketch) => {
        if(err) return console.log(err)
        res.json({message: "Sketch created! 🐲", sketch: newSketch})
    })
})

// Edit sketch?🧐
sketchRouter.patch('/sketches/:id', (req, res)=>{
    Sketch.findById(req.params.id, req.body, (err,updatedSketch)=>{
        if(err) return console.log(err)
        res.json({message: "Sketch updated!", sketch:updatedSketch})
    })
})

// Delete a specific sketch
sketchRouter.delete('/sketches/:id', (req, res) => {
    Sketch.findByIdAndRemove(req.params.id, (err, deletedSketch) => {
        if(err) return console.log(err)
        res.json({message: "Sketch deleted! 🐲"})
    })
})


module.exports = sketchRouter