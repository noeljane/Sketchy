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
	passport = require('passport'),
	passportConfig = require
	('./config/passport.js'),
	userRoutes = require('./routes/users.js')
	sketchRoutes = require('./routes/sketches.js')
	
	
	
// Environment port
const
port = process.env.PORT || 3000,
mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/sketchy'

// Mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB!")
})

const store = new MongoDBStore({
	uri: mongoConnectionString, 
	collection:'sessions'
})

// Middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(session({
	secret: "boomchakalaka",
	cookie: {maxAge: 60000000},
	resave: true, 
	saveUninitialized: false,
	store: store
}))

app.use(passport.initialize())
app.use(passport.session())


// User routes
app.use('/', userRoutes)

// Sketch routes
app.use('/', sketchRoutes)

// Root route
app.get('/', (req, res) => {
	res.render('index')
})





app.listen(port, (err) => {
	console.log(err || "Server running on port " + port)
})