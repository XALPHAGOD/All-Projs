const express= require("express");

const router= express.Router();

router.post("/login", (req, res)=>{
    console.log(req.body);
    if(req.body.userName)
        return res.status(200).send(`<h1>Recieved Data From ${req.body.userName}</h1>`);
    res.status(401).send("<h1>Recieved Empty Form</h1>");
});

module.exports= router;