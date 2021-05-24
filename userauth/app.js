const express= require("express");

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongoose= require("mongoose");
const session= require("express-session");
const MongoStore= require("connect-mongo");

const dbURI= "mongodb://localhost:27017/middleware_tutorial";
const dbOPTIONS= {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbURI, dbOPTIONS);


// app.use(globalMiddleware);      //use global middlewares, cannot access before initialization for ES6 style func declaration

// function globalMiddleware(req, res, next){
//     console.log("Global middleware");
//     req.customProperty= "Created Custom Prop for req header";
//     const errObj= new Error("Creating new Error in globalMiddleware");
//     // next(errObj);
//     next();
// };

// const globalErrorHandler= (err, req, res, next)=>{
//     if(err){
//         res.send("<h1>From globalErrorHandler, comment out custom error in globalMiddleware</h1>");
//     }
// }

// function middleware1(req, res, next){
//     console.log("middleware1");
//     console.log(req.customProperty);
//     req.customProperty= "Reassigned Custom Prop";
//     const errObj= new Error("Creating new Error");
//     next();
//     // next(errObj);     //pass on to next function
// }

// const errorHandlerMiddleware= (err, req, res, next)=>{
//     if(err){
//         res.send("<h1>From errorHandlerMiddleware, comment out custom error in middleware1</h1>");
//     }
//     // next();     //in case no error continue on to next middleware but not advisable
// }

// app.use(errorHandlerMiddleware);

// const stdExpCallbck= (req, res, next)=>{
//     // console.log(req);
//     // console.log(res);
//     console.log(req.customProperty);
//     console.log(next, "Inside stdExpCallbck");
//     res.send("<h1>Hello Atlast</h1>");
// }

// app.get("/", middleware1, errorHandlerMiddleware, stdExpCallbck);       //order of middlewares matter

// app.use(globalErrorHandler);        //skips all other middlewares if any error occurs



const sessionStore= MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/middleware_tutorial",
    // mongoOptions: dbOPTIONS,
    collectionName: "sessions"
});

app.use(session({
    store: sessionStore,
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));

app.get("/", (req, res, next)=>{
    // console.log(req.session);       //1st visit no visitedCount prop available as it wasn't set

    if(req.session.visitedCount)        //set custom property to session
        req.session.visitedCount++;
    else
        req.session.visitedCount= 1;        //for 1st visit

    res.send(`<h1>Sessions Visited: ${req.session.visitedCount}</h1>`);
});

app.listen(3000);