//User Model here
const
    mongoose = require('mongoose')
    bcrypt = require('bcrypt-nodejs')
    userSchema = new mongoose.Schema({
        name: String, 
        email: String, 
        password: String
    })

//Create Password digest
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8))
}