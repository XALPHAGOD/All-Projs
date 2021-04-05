const http= require("http");        //import http module

const server= http.createServer( (req, res)=>{      //req obj to get info about current http request
    // console.log(req.url);
    if(req.url=="/"){           //url request
        res.end("Responded From Server");     //responding to port
    }
    else if(req.url=="/about" || req.url=="/contact"){
        res.end("About/ Contact Us");
    }else if(req.url=="/menu"){
        res.end("Menu");
    }else{
        res.writeHead(404, {"Content-type": "text/html"});
        res.end("<h1>Error 404- Page Doesn't Exist</h1>")
    }
});       

server.listen(9100, "127.0.0.1", ()=>{              //adding listener to port 9100 of localhost
    console.log("listening to port 9100");          //acknowledging the port listen
});