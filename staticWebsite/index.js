const express= require("express");
const app= express();

const path= require("path");

const port= 5000;

websitePath= path.join(__dirname, "/home");

app.use(express.static(websitePath));

app.get("/", (req, res)=>{
    res.send("<h3> Website is Down </h3>");
});

app.listen(port, ()=> console.log(`listening to port ${port}`) );