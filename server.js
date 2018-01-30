const
    express = require('express'),
    app = express(),
    ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session),
	passport = require('passport')
	userRoutes = require('./routes/users.js')
	passportConfig = require('./config/passport.js')
	
	
	
// Environment port
const
port = process.env.PORT || 3000,
mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/sketchy'

// Mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB!")
})


// Middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

app.use('/', userRoutes)

app.get('/', (req, res) => {
	res.send("working")
})

app.listen(port, (err) => {
	console.log(err || "Server running on port " + port)
})

test