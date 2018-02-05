//Sketch Model here
const
    mongoose = require('mongoose'), 
    sketchSchema = new mongoose.Schema({
        imgUrl: {type:String,required:true},
        title: {type:String,required: true},
        tag: String,
        // ref: 'User' = pointing to the collection in the mongoDB
        _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        giphy_url:{type:String, required:true}
    })

const Sketch = mongoose.model('Sketch', sketchSchema)
module.exports = Sketch