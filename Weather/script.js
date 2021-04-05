const http= require("http");
const fs= require("fs");
const requests= require("requests");

const mainFile= fs.readFileSync("index.html", "utf-8");
let replaceVal= (temp, ori)=>{
    let tempvar= temp.replace("{%temp%}", ori.main.temp);
    tempvar= tempvar.replace("{%mintemp%}", ori.main.temp_min);
    tempvar= tempvar.replace("{%maxtemp%}", ori.main.temp_max);
    tempvar= tempvar.replace("{%city%}", ori.name);
    tempvar= tempvar.replace("{%country%}", ori.sys.country);
    return tempvar;
}

const server= http.createServer((requ, resp)=>{
    if(requ.url=="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Asansol&appid=220cfcdfb35a028029aeb57061c7ee8a"
        ).on("data", (chunkData)=>{
            let jsob= [JSON.parse(chunkData)];
            let rData= jsob.map((value)=>replaceVal(mainFile, value)).join("");
            resp.write(rData);
        }).on("end", (err)=>{
            if(err)
                return console.log("Error",err);
            resp.end();
        });
    }
});

server.listen(9100, "127.0.0.1");