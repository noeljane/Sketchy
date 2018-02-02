// Sketch routes
const
    express = require('express'),
    sketchRouter = new express.Router(),
    Sketch = require('../models/Sketch.js')


// Get all sketches
sketchRouter.get('/sketches', (req, res) => {
    Sketch.find({}, (err, allSketches) => {
        if(err) return console.log(err)
        res.render('sketches_views/explore', {sketches: allSketches})
    })
})

// Form to create new sketch
sketchRouter.get('/sketches/new', (req, res) => {
    if (req.user) {
        res.render('canvas')
    } else
        res.redirect('/')  
})

// Create new sketch
sketchRouter.post('/sketches', (req, res) => {
    console.log("Incoming image YAYYY!")
    var newSketch = new Sketch(req.body)
    newSketch._by = req.user && req.user.id
    newSketch.save((err,newSketch)=>{
        if(err) return console.log(err)
        res.render('sketches_views/showsketches', {title: "New sketch!", sketch: newSketch})
    })
})

// Get specific sketch
sketchRouter.get('/sketches/:id', (req, res) => {
    Sketch.findById(req.params.id, (err, thatSketch) => {
        if(err) return console.log(err)
        //res.json(thatSketch)
        res.render('sketches_views/showsketches', {title: "This sketch", sketch:thatSketch})
    })
})
// get edit sketch view
sketchRouter.get('/sketches/:id/edit', (req, res)=>{
    Sketch.findById(req.params.id, (err, sketch)=>{
        if(err) return console.log(err)
        if((req.user.id) == (sketch._by)) {
            console.log('You own this sketch!')
            res.render('sketches_views/editsketch', {sketch:sketch})
        } else {
            res.redirect('/sketches/' + req.params.id)
            //add flash message here
        }
        })
    
    
})

// update sketch
sketchRouter.patch('/sketches/:id/edit', (req, res)=>{
    console.log(req.body)
    Sketch.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSketch)=>{
        res.render('sketches_views/showsketches', {title: "This sketch", sketch: updatedSketch})
    })
})

// Delete a specific sketch
sketchRouter.delete('/sketches/:id', (req, res) => {
    Sketch.findByIdAndRemove(req.params.id, (err, deletedSketch) => {
        if(err) return console.log(err)
        res.redirect('/sketches')
        //res.json({message: "Sketch deleted! 🐲"})
    })

    
})



module.exports = sketchRouter