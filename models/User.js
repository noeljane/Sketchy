//User Model here
const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    userSchema = new mongoose.Schema({
        name: String, 
        email: String,
        password: String,
        googleId: String
    })

//Create Password digest
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8))
}

//Compare Password with password in the database
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User