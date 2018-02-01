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


userRouter.get('/users/:id', isLoggedIn, (req, res) => {
    User.findById(req.params.id, (err, thatUser) => {
        if(err) return console.log(err)
        res.render('users_views/usershow', {title: "This User", user: thatUser})
    })
})


// Create new user

userRouter.get('/users/new', (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err) return console.log(err)
        res.render('users_views/usernew', {title: "New User", user: newUser})
    })
})


userRouter.delete('/users/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if(err) return console.log(err)
        res.redirect('/')
    })
})

// Patch a specific user
// userRouter.patch('/users/:id', (req, res) => {
//     User.findBy
// })


module.exports = userRouter