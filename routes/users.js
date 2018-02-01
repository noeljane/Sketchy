// User routes
const
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router()

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
        res.redirect('/login')
}   

userRouter.get('/login', (req, res) => {
    res.render('login')
})
    
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
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

// Get all users
userRouter.get('/users', (req,res)=>{
    User.find({},(err, allUsers)=>{
        if(err) return console.log(err)
        res.render('users_views/userindex', {users: allUsers})
    })
})

// Create new user
userRouter.get('/users/new', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err) return console.log(err)
        res.render('users_views/usernew', {title: "New User", user: newUser})
    })
})

// Patch a specific user
// userRouter.patch('/users/:id', (req, res) => {
//     User.findBy
// })

module.exports = userRouter