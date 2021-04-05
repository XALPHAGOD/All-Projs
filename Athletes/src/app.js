const express= require("express");
const mongoose= require("mongoose");

require("./database/connection");
const route= require("./routers/routes");

const port= process.env.PORT || 9100;

const app= express();

app.use(express.json());
app.use(route);



app.listen(port, ()=>{
    console.log(`Port: ${port}`);
})