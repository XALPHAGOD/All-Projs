const authorize= (req, res, next)=>{
    if(req.query.name === "John"){
        console.log("Authorized");
        req.userProp= {name: req.query.name, id: 403};
        next();
    }
    else
        res.status(401).send("Un-Authorized");
}

module.exports= authorize;