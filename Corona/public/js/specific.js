const url= `https://api.covid19api.com/summary`;



const morebtn= document.getElementById("morebtn");
const code= document.getElementById("code");
const ophead= document.getElementById("ophead");
const nconf= document.getElementById("nconf");
const tconf= document.getElementById("tconf");
const ndea= document.getElementById("ndea");
const tdea= document.getElementById("tdea");
const nrec= document.getElementById("nrec");
const trec= document.getElementById("trec");



const specInfo= async (event)=>{
    event.preventDefault();
    if(code.value==""){
        ophead.innerText= "Please enter Country Code before search";
        nconf.innerText= "";
        tconf.innerText= "";
        ndea.innerText= "";
        tdea.innerText= "";
        nrec.innerText= "";
        trec.innerText= "";
    }
    else{
        try{
            const allCountries= (await (await fetch(url)).json()).Countries;
            var res=null;
            for(var i=0;i<allCountries.length;i++){
                if(allCountries[i].CountryCode==code.value.toUpperCase()){
                    res= allCountries[i];
                    break;
                }
            }
            if(res){
                ophead.innerText= `${res.Country}`;
                nconf.innerText= `New Confirmed= ${res.NewConfirmed}`;
                tconf.innerText= `Total Confirmed= ${res.TotalConfirmed}`;
                ndea.innerText= `New Deaths= ${res.NewDeaths}`;
                tdea.innerText= `Total Deaths= ${res.TotalDeaths}`;
                nrec.innerText= `New Recovered= ${res.NewRecovered}`;
                trec.innerText= `Total Recovered= ${res.TotalRecovered}`;
            }
            else{
                ophead.innerText= "Invalid Country Code";
                nconf.innerText= "";
                tconf.innerText= "";
                ndea.innerText= "";
                tdea.innerText= "";
                nrec.innerText= "";
                trec.innerText= "";
            }
        }catch(err){
            ophead.innerText= "SERVER ERROR";
            nconf.innerText= "";
            tconf.innerText= "";
            ndea.innerText= "";
            tdea.innerText= "";
            nrec.innerText= "";
            trec.innerText= "";
            console.log(err);
        }
    }
}

morebtn.addEventListener("click", specInfo);