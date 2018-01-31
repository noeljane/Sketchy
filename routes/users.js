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

userRouter.get('/users', (req,res)=>{
    User.find({},(err, allUsers)=>{
        if(err) return console.log(err)
        res.render('../views/users_views/userindex', {users:allUsers})
    })

})
    
module.exports = userRouter