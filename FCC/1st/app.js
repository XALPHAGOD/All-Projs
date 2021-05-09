const http= require("http");
const fs= require("fs");


const express= require("express");
const path= require("path");
const { dirname } = require("path");

const app= express();
const port= 5000;
const morgan= require("morgan");
app.use(morgan("tiny"));

app.use(express.static("./public"));

app.use(express.urlencoded({extended: false}));     //parse form data
app.use(express.json());        //parse incoming json data



// const {products}= require("./apiData");  //moved to productsRoutes
const logger= require("./logger");      //custom logger
const authorize= require("./authorize");

// app.use(logger);        //optional way to use with every route

const login= require("./routes/login");
app.use(login);

const productsRoutes= require("./routes/products");
app.use("/api/products", productsRoutes);


app.get("/", (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.status(200).sendFile(path.join(__dirname, "./home.html"));
});


app.get("/api/v1/query", authorize, (req, res)=>{
    console.log("Req Query", req.query);
    console.log("User Prop", req.userProp);
    const {search, limit}= req.query;

    let result= products;
    
    if(search){
        result= result.filter((prod)=>prod.name.startsWith(search));
    }
    if(limit){
        result= result.slice(0, Number(limit));
    }
    if(result.length<1)
        return res.status(200).send("<h1>No Data Found With Query Paramaters</h1>");
    res.status(200).json(result);
});


app.all("*", (req, res)=>res.status(404).send("<h1>Page Not Found</h1>"));

app.listen(port, ()=>console.log(`Port: ${port}`));





// const server= http.createServer((req, res)=>{
//     url= req.url;
//     if(url==="/"){
//         res.writeHead(200, {"content-type": "text/html"})
//         res.end(fs.readFileSync("./home.html"));
//     }
//     else if(url==="/about"){
//         res.writeHead(200, {"content-type": "text/html"})
//         res.end(`<h1>From About</h1>`);
//     }
//     else{
//         res.writeHead(404, {"content-type": "text/html"})
//         res.end(`<h1>Page Not Found</h1>`);
//     }
    
// });

// server.listen(5000);