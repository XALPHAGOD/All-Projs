const http= require("http");        //import http module
const fs= require("fs");


// fs.readFile(`${__dirname}/api.json`, "utf-8", (err, data)=>{     //async version
//     let convData= JSON.parse(data);
// });

let convData= JSON.parse(fs.readFileSync(`${__dirname}/api.json`, "utf-8"));        //used sync version


const server= http.createServer( (req, res)=>{      //req obj to get info about current http request
    // console.log(req.url);

    if(req.url=="/"){           //url request
        res.end("Responded From Server");     //responding to port
    }
    else if(req.url=="/api"){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(convData[3].name);
    }
    else{
        res.writeHead(404, {"content-type": "text/html"});
        res.end("<h1>Error 404- Page Doesn't Exist</h1>")
    }
});       


server.listen(9100, "127.0.0.1", ()=>{              //adding listener to port 9100 of localhost
    console.log("listening to port 9100");          //acknowledging the port listen
});