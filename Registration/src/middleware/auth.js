const jwt= require("jsonwebtoken");
const Registration= require("../models/registration");

const auth= async (req, res, callback)=>{
    try{
        const token= req.cookies.cookieNameIsCookie;
        // console.log(token);
        const verifyUser= await jwt.verify(token, process.env.secretKey);
        const user= await Registration.findOne({_id: verifyUser._id});
        // console.log(user.email);

        req.user= user;
        req.token= token;
        
        callback();
    }catch(err){
        res.status(401).send(err);
    }
}

module.exports= auth;