const logger= (req, res, next)=>{       //custom middleware
    const method= req.method;
    const reqUrl= req.url;
    console.log("Custom Logger:", method, new Date().toLocaleTimeString(), reqUrl);
    next();     //next callback function continues flow into next part of code
}

module.exports= logger;