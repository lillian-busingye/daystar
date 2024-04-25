//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require('passport');
const expressSession = require("express-session")({
    secret:"secret",
    resave:false,
    saveUninitialized:false
  })

  require('dotenv').config();

  //import register model with user details
  const AdminRegistration = require("./models/AdminRegistration");

//import routes
const registrationRoutes = require("./routes/registrationRoutes");


const port =3003;

//configurations
//setting the database connection to mongoose
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection
    .once('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', err => {
      console.error(`Connection error: ${err.message}`);
   });

//setting the view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.static(path.join(__dirname, "public"))) // Set directory for static files
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//express-session configurations
app.use(expressSession); //using express sessions
app.use(passport.initialize()); //helps to keep track of the users session in the system
app.use(passport.session());

//passport configurations
passport.use(AdminRegistration.createStrategy());
passport.serializeUser(AdminRegistration.serializeUser());
passport.deserializeUser(AdminRegistration.deserializeUser());

//using imported routes
app.use("/", registrationRoutes);
// app.use("/", authenticationRoutes);


//for invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

//bootstrap server
app.listen(port,()=> console.log(`listening on port ${port}`));