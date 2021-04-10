require("dotenv").config();
const express= require("express");
const hbs= require("hbs");
const bcrypt= require("bcryptjs");
const cookieParser= require("cookie-parser");



require("./database/connection");
const Registration= require("./models/registration");
const auth= require("./middleware/auth");




const port= process.env.PORT || 5300;



const path= require("path");
const staticPath= path.join(__dirname, "../main");
const viewsPath= path.join(__dirname, "../templates/views");
const partialsPath= path.join(__dirname, "../templates/partials");



const app= express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use(express.static(staticPath));
app.set("views", viewsPath);
app.set("view engine", "hbs");



hbs.registerPartials(partialsPath);



app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/index", (req, res)=>{
    res.render("index");
});





app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", async (req, res)=>{
    try{
        // console.log(req.body);
        const password= req.body.password;
        const confirmPassword= req.body.confirmPassword;
        if(password === confirmPassword){
            
            const regUser= new Registration({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password
            });

            const token= await regUser.generateToken();

            res.cookie("cookieNameIsCookie", token, {
                // expires: new Date(Date.now()+60000),
                httpOnly: true
            });



            const regStat= await regUser.save();

            res.status(201).render("loggedin");
        }else{
            res.status(400).send("Passwords don't match");
        }
    }catch(err){
        res.status(400).send(err);
    }
});





app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", async (req, res)=>{
    try{
        const extractEmail= req.body.email;
        const extractPassword= req.body.password;
        
        const searchRes= await Registration.findOne({email: extractEmail});
        // searchRes.password===extractPassword
        if(searchRes != null){
            const verifyPass= await bcrypt.compare(extractPassword, searchRes.password);        //use await or else login before verification
            if(verifyPass){

                const token= await searchRes.generateToken();

                res.cookie("cookieNameIsCookie", token, {
                    httpOnly: true
                });


                
                res.render("loggedin");
            }
            else{
                res.send("Invalid Input");
            }
        }
        else{
            res.send("Invalid Input");
        }
        
    }catch(err){
        res.status(400).send("Invalid Input");
    }
});





app.get("/another", auth, (req, res)=>{
    if((req.cookies.cookieNameIsCookie))
        res.render("another");
    else
        res.status(400).send("You have to first Sign In"); 
});





app.get("/logout", auth, async (req, res)=>{
    try{
        // console.log(req.user._id);
        req.user.tokens= req.user.tokens.filter((tokenObj)=>{
            return tokenObj.token != req.token;
        });

        res.clearCookie("cookieNameIsCookie");
        await req.user.save();
        res.status(200).render("index");
    }catch(err){
        res.status(500).send(err);
    }
});





app.get("/logoutalldevices", auth, async (req, res)=>{
    try{
        // console.log(req.user._id);
        req.user.tokens= [];
        
        res.clearCookie("cookieNameIsCookie");
        
        await req.user.save();
        res.status(200).render("index");
    }catch(err){
        res.status(500).send(err);
    }
});





// const createToken= async ()=>{
//     const token= await jwt.sign({_id: "606ee24970fc770e24e6359f"}, "b7ud98ds698f0d790f87)DS8f90-sn8d90-gf80b9876dfgb98osb908g08s8g", {expiresIn: "1h"});       //create token
//     console.log(token);

//     const verifyUser= await jwt.verify(token, "b7ud98ds698f0d790f87)DS8f90-sn8d90-gf80b9876dfgb98osb908g08s8g");        //verifies if  passed token is same
//     console.log(verifyUser);
// }

// createToken();


app.listen(port, ()=>{
    console.log(`Port: ${port}`)
});



// const secureP= async (pass)=>{
//     const encr= await bcrypt.hash(pass, 10);
//     console.log(encr);

//     const comp= await bcrypt.compare(pass, encr);
//     console.log(comp);
// }

// secureP("XALPHAGOD");