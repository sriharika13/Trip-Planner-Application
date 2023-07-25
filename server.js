const express = require('express')
const ejsMate= require('ejs-mate') //ejsMate is layout manager for EJS templates. 
const methodOverride = require('method-override')
const path = require('path')
const postRouter = require('./routes/postRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const userRouter = require('./routes/userRoutes')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport= require('passport') //main Passport.js library that provides the infrastructure and functionality for handling authentication in Node.js apps
const LocalStrategy= require('passport-local') //username and password-based authentication
const { UserModel } = require('./models/UserModel')

const app = express()
app.use(methodOverride('_method'))  //this will be in query string tht defines the put, patch or delete methods of form

app.use(express.static('public')) //serve static files relative to the root directory of your application

app.engine('ejs', ejsMate); //we're telling Express to use ejsMate(extention of ejs) for rendering EJS templates which has 'ejs' extension
app.set('view engine', 'ejs') //template engine for rendering views is ejs
app.set('views', path.join(__dirname, 'views')) //specify the folder where your application's views (templates) are located

app.use(express.urlencoded({ extended: true })) //when form data comes in, this parses it and puts in req.body

//session middleware will retrieve the session data based on the session ID and make it available on the req.session object.
app.use(session({ 
    secret: "mysecretkey", 
    resave: false, 
    httpOnly: true, //it can only be accessed and modified by the server through HTTP(S) requests 
    // if a user visits your website and does not perform any actions that require session data, 
    // a new session will still be created and stored in the session store, if saveUninitialized: true. so set it to false
    saveUninitialized: false,
    maxAge: 1000*60*60*24*7 //will expire after exact 7 days from now
}))
app.use(flash()) 
//short-lived messages stored in the session and are typically used to display one-time success/error messages to users.
// After a flash message is retrieved once, it is automatically removed from the session.

app.use(passport.initialize()) //intializes Passport for incoming requests, allowing authentication strategies to be applied.
app.use(passport.session()) //if login session has been established, this middleware will populate req.user with the current user.
passport.use(new LocalStrategy(UserModel.authenticate())) //authenticate is one of method thts added bcoz of passportLoalMongoose plugin
passport.serializeUser(UserModel.serializeUser()) //user data is transformed into format tht can be stored in session, then stored
passport.deserializeUser(UserModel.deserializeUser()) //It retrieves the user data from the session and constructs a user object from it.

app.use((req, res, next)=>{
    res.locals.currentUser= req.user //when user logs in and if login credentials are correct then user info stored in req.user.
    //runs on every req, if success flash msg found in session store, 
    // this middleware sets success flash msg available to current req res cycle and all view templates rendered during that req-res cycle
    res.locals.success= req.flash('success'); 
    res.locals.error= req.flash('error')
    //connect-flash middleware uses a separate session store to temporarily store the flash messages, not stored in req.session.flash
    next();
})

mongoose.connect('mongodb://localhost:27017/CampingDB')
    .then(() => {
        console.log("connection open!")
    })
    .catch((err) => {
        console.log("Connection ERRORR!!: ", err)
    })


app.get('/', (req, res) => {
    res.render("home")
})
app.use('/camping', postRouter)
app.use('/camping/:id/reviews', reviewRouter)
app.use('/', userRouter)
app.use('*', (req, res) => {
    res.send("page not found")
})


app.listen(8080, () => {
    console.log("server running on port 8080")
})

