// User routes
const
    express = require('express'),
    passport = require('passport'),
    User = require('../models/User.js'),
    Sketch = require('../models/Sketch.js')
    userRouter = new express.Router()

// Function to check if logged in 
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
        res.redirect('/login')
}   
// Login in Route
userRouter.get('/login', (req, res) => {
    res.render('login', {message: req.flash('loginMessage')})
})

//New Session Started 
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', 
    failureRedirect: '/login'
}))

// New User  
userRouter.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash('signupMessage')})
})
   
// Create User
userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}))

// Profile view
userRouter.get('/profile', isLoggedIn, (req, res) => {
    // res.render('profile', {user: req.user})
    res.redirect(`/users/${req.user._id}`)
})

// Log out route (deletes session)
userRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// Show all users
userRouter.get('/users', isLoggedIn, (req,res)=>{
    User.find({},(err, allUsers)=>{
        if(err) return console.log(err)
        res.render('users_views/userindex', {users: allUsers})
    })
})

// Get all users -DELETE??? 
userRouter.get('/users', (req,res) => {
    User.find({}, (err, allUsers) => {
        if(err) return console.log(err)
        res.render('users_views/userindex', {users: allUsers})
    })
})

// Show specific user
userRouter.get('/users/:id', isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, thatUser) => {
        if(err) return console.log(err)
        Sketch.find({"_by": req.params.id}, (err,userSketches)=>{
            if(err) return console.log(err)
            res.render('users_views/usershow', {title: "This User", user: thatUser, sketches: userSketches})
        })
    })
})

// Get edit user view
userRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('users_views/edituser', {user: req.user})
})

// Update a specific user
userRouter.patch('/users/:id', isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err,updatedUser)=>{
        if(err) console.log(err)
        const updatedUserData = {}
        for(field in req.body) {
            if(req.body[field] != "")
            updatedUserData[field] = req.body[field]
        }
        Object.assign(updatedUser, updatedUserData)
        updatedUser.save((err,savedUser)=>{
            if(err) return console.log(err)
            console.log(savedUser)
            res.redirect('/profile')
        })
    })
})


// Delete user
userRouter.delete('/users/:id', isLoggedIn, (req,res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if(err) return console.log(err)
        res.redirect('/logout')
    })
})


// Auth with Google
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// Callback route for Google to redirect to
userRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/')
})



module.exports = userRouter