// User routes
const
    express = require('express'),
    passport = require('passport'),
    User = require('../models/User.js'),
    Sketch = require('../models/Sketch.js')
    userRouter = new express.Router()

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
        res.redirect('/login')
}   

userRouter.get('/login', (req, res) => {
    res.render('login')
})
    
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', //need to direct to /users/:id page
    failureRedirect: '/login'
}))
    
userRouter.get('/signup', (req, res) => {
    res.render('signup')
})
    
userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}))
    
userRouter.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user})
})
    
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

// Get all users
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


// Delete user
userRouter.delete('/users/:id', isLoggedIn, (req,res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if(err) return console.log(err)
        res.redirect('/')
    })
})

// Get edit user view
userRouter.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('users_views/edituser', {user: req.user})
})

// Update a specific user
userRouter.patch('/users/:id', isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if(err) return console.log(err)
        res.redirect('/profile')
    })
})


module.exports = userRouter