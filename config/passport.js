const 
    passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth20'),
    User = require('../models/User.js'),
    clientId = process.env.CLIENTID,
    clientSecret = process.env.CLIENTSECRET

// Google oauth
passport.use(
    new GoogleStrategy ({
        callbackURL: 'auth/google/redirect',
        clientID: clientId,
        clientSecret: clientSecret
    }, () => {
        console.log('passport callback function fired')
    })
)

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
        newUser.password = newUser.generateHash(password)
        newUser.save((err, brandNewUser)=>{
            if(err) return console.log(err)
            return done(null, brandNewUser,null)
        })
    })
}))

//Log in
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
}, (req,email, password, done)=>{
    //check email to see if that user exists
    User.findOne({email:email}, (err,user)=>{
        if(err) return done(err)
        if(!user) return done(null,false,req.flash('loginMessage', 'No user found...'))
        //SECURITY RISK!!!!!!
        //delete following conditional after testing is complete 
        if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password'))
        return done(null,user)
    })
}))

module.exports = passport