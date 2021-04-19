const path= require("path");
const express= require("express");
const hbs= require("hbs");



const port= process.env.PORT || 9100;
const url= `https://api.covid19api.com/summary`;



const app= express();



const staticPath= path.join(__dirname,"./public")
const allReqPath= path.join(__dirname, "./ViewsPartials/views");
const partialsPath= path.join(__dirname, "./ViewsPartials/partials");



app.set("view engine", "hbs");
app.set("views", allReqPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));



app.get("", (req, res)=>{
    res.render('home');
});
app.get("/home", (req, res)=>{
    res.render('home');
});
app.get("/all", (req, res)=>{       
    res.render("all");
});
app.get("/more", (req, res)=>{       
    res.render("more");
});
app.get("/symptoms", (req, res)=>{       
    res.render("symptoms");
});
app.get("/about", (req, res)=>{       
    res.render("about");
});
app.get("/contact", (req, res)=>{       
    res.render("contact");
});
app.get("*", (req, res)=>{       
    res.render("error");
});

app.listen(port, ()=>{
    // console.log(`PORT:${port}`);
});