//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const expressSession = require("express-session")({
    secret:"secret",
    resave:false,
    saveUninitialized:false
  })

  require('dotenv').config();

  //import register model with user details
  const administer = require("./models/administer");

//import routes
// const registrationRoutes = require("./routes/registrationRoutes");
const registerbabyRoutes = require("./routes/registerbabyRoutes");
const landingRoutes = require("./routes/landingRoutes");
const adminregisterRoutes = require("./routes/adminregisterRoutes");
const sitterRoutes = require("./routes/sitterRoutes");
const aboutRoutes =require("./routes/aboutRoutes");
const adminloginRoutes = require("./routes/adminloginRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const dollStallRoutes = require("./routes/dollStallRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const authRoutes = require("./routes/authRoutes");

// instantiations
const app = express();

// const port =3003;

//configurations
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
 });

app.set("view engine","pug"); // setting the view engine to pug
app.set("views", path.join(__dirname,"views")); //specify the directory where the views are found
//middleware
app.use(express.static(path.join(__dirname, "public")))//set directory fot static fires 
app.use('/public/images/images', express.static(__dirname +'/public/images/images'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "public"))) // Set directory for static files
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors());

//express-session configurations
app.use(expressSession); //using express sessions
app.use(passport.initialize()); //helps to keep track of the users session in the system
app.use(passport.session());

//passport configurations
passport.use(administer.createStrategy());
passport.serializeUser(administer.serializeUser());
passport.deserializeUser(administer.deserializeUser());

//using imported routes
// app.use("/", registrationRoutes);
app.use("/", registerbabyRoutes);
app.use("/", landingRoutes);
app.use("/", adminregisterRoutes);
app.use("/", sitterRoutes);
app.use("/", aboutRoutes);
app.use("/", adminloginRoutes);
app.use("/", dashboardRoutes);
app.use("/", dollStallRoutes);
app.use("/", purchaseRoutes);
app.use("/", authRoutes);
// app.use("/", authenticationRoutes);


//for invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

//bootstrap server
app.listen(3000,()=> console.log(`listening on port ${3000}`));