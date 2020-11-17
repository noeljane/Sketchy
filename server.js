const
	dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session),
	passport = require('passport'),
	passportConfig = require('./config/passport.js'),
	User = require('./models/User.js'),
	userRoutes = require('./routes/users.js'),
	Sketch = require('./models/Sketch.js'),
	sketchRoutes = require('./routes/sketches.js'),
	request = require('request'),
	apiKey = process.env.APIKEY,
	methodOverride = require("method-override"),
	cookieSession = require('cookie-session')
	
	
	

// Environment port
const
port = process.env.PORT || 3000,
mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/sketchy'

// Mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB! 🐲")
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

app.use(methodOverride("_method"))

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static(`${__dirname}/public`))
app.use(session({
	secret: "boomchakalaka",
	cookie: {maxAge: 60000000},
	resave: true, 
	saveUninitialized: false,
	store: store
}))

app.use(passport.initialize())
app.use(passport.session())
// Setting local veriable current user(for navbar login)
app.use(function(req, res, next) {
	res.locals.currentUser = req.user
	next()
})


// User routes
app.use('/', userRoutes)

// Sketch routes
app.use('/', sketchRoutes)

// Google auth routes
app.use('/auth', userRoutes)

// Root route
app.get('/', (req, res) => {
	res.render('index')
})

// Giphy API
app.get('/random', (req, res) => {
	var url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
	// contact giphy at the api url endpoint
	request.get(url, (err, response, body) => {
	  // when we get info back, turn it into a JS object
	  var data = JSON.parse(body)
	  // the image url is inside
	  var imgUrl = data.data.image_original_url
	  // send an image tag to the browser to finish the response
	  res.send(data)
	})
  })

app.get('/search/:searchstr', (req, res) => {
	var searchstr = req.params.searchstr
	var url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchstr}`
	request.get(url, (err, response, body) => {
		var data = JSON.parse(body)
		if(data.data.length) {
			var imgUrl = data.data[0].images.original.url
		} else {
			var imgUrl = "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg"
		}
		res.send(data)
	})
})

app.get('/random/:tag', (req, res) => {
	var url = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${req.params.tag}`
	request.get(url, (err, response, body) => {
		var data = JSON.parse(body)
		if(data.data.length) {
			var imgUrl = data.data[0].images.original.url
		} else {
			var imgUrl = "https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw.jpg"
		}
		res.send(data)
	})
})


app.listen(port, (err) => {
	console.log("something else")
	console.log(err || "Server running on port " + port)
})

// mongodb+srv://noel:christmas@cluster0.wfiog.mongodb.net/sketchy2?retryWrites=true&w=majority