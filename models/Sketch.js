//Sketch Model here
const
    mongoose = require('mongoose'), 
    sketchSchema = new mongoose.Schema({
        imgUrl: String,
        title: String,
        tag: String, 
        _by:{type:mongoose.Schema.Types.ObjectId, ref: 'User'}
    })

const Sketch = mongoose.model('Sketch', sketchSchema)
module.exports = Sketch
