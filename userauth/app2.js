const express= require("express");

const session= require("express-session");
const MongoStore= require("connect-mongo");
const passport= require("passport");
const crypto= require("crypto");        //inbuilt nodejs lib
const routes= require("./routes/routes");

require("./config/dbConn");     //for user collec
require("dotenv").config();

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



const sessionStore= MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: "sessions"
});

app.use(session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*30
    }
}));

require("./config/passportConfig");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    console.log(req.session);
    console.log(req.user);
    next();
});

app.use(routes);

app.listen(3000);