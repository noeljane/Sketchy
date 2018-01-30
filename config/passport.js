const 
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        done(err,user)
    })
})

//Sign up
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true

}, (req, email, password, done)=>{
    User.findOne({email: email}, (err,user)=>{
        if(err) return done(err) 
        if(user) return done(null, false, req.flash('signupMessage', 'That email is already taken'))
        var newUser = new User()
        newUser.name = req.body.name
        newUser.email = req.body.email 
    })
})