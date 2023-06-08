const express = require('express');
const PORT = 3000;
const db = require('./config/mongoose');
const ejs = require('ejs');
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const path = require('path');


const app = express();

//session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

//assets
app.use(express.static(path.join(__dirname, "assets")));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(
    session({
      name: "Store",
      secret: "myproject123",
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: 1000 * 60 * 100,
      },
      store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/Divisha",
        autoRemove: "disabled",
      }),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(passport.checkAuthentication);

//routes
app.use('/', require('./routes/index'));

//listen
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`server running on ${PORT}`);
});
