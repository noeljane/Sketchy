//Sketch Model here
const
    mongoose = require('mongoose'), 
    sketchSchema = new mongoose.Schema({
        imgUrl: String,
        title: {type:String,required: true},
        tag: String,
        // ref: 'User' = pointing to the collection in the mongoDB
        _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        giphy_url: String
    })

const Sketch = mongoose.model('Sketch', sketchSchema)
module.exports = Sketch