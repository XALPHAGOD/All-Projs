const url= `https://api.covid19api.com/summary`;



const tabval= document.getElementById("tabval");

async function get_send(prop){

    function comparator(prop){
        return function(a,b){
            return b[prop]-a[prop];
        }
    }

    try {
        var allCountries= (await (await fetch(url)).json()).Countries;
        if(prop!=null)
            allCountries.sort(comparator(prop));
        return allCountries;
    } catch (err) {
        return err;
    }
}

const getInfo= async (event)=>{

    event.preventDefault();
    try{

            allCountries= await get_send(null);
            if(allCountries==null)
                throw allCountries;

            var newr=tabval.insertRow(0);

            var rnk= newr.insertCell(0);
            var coun= newr.insertCell(1);
            var code= newr.insertCell(2);
            var conf= newr.insertCell(3);
            var dea= newr.insertCell(4);
            var rec= newr.insertCell(5);
            var dr= newr.insertCell(6);
            var rr= newr.insertCell(7);

            rnk.innerHTML= "Rank";
            coun.innerHTML= "Country";
            code.innerHTML= "Country Code";
            conf.innerHTML= "Total Confirmed";
            dea.innerHTML= "Total Deaths";
            rec.innerHTML= "Total Recovered";
            dr.innerHTML= "Death Rate";
            rr.innerHTML= "Recovery Rate";

            rnk.style.fontWeight= "750";
            coun.style.fontWeight= "750";
            code.style.fontWeight= "750";
            conf.style.fontWeight= "750";
            dea.style.fontWeight= "750";
            rec.style.fontWeight= "750";
            dr.style.fontWeight= "750";
            rr.style.fontWeight= "750";

            rnk.style.fontSize= "large";
            coun.style.fontSize= "large";
            code.style.fontSize= "large";
            conf.style.fontSize= "large";
            dea.style.fontSize= "large";
            rec.style.fontSize= "large";
            dr.style.fontSize= "large";
            rr.style.fontSize= "large";

            for(var i=1;i<=allCountries.length;i++){

                var newr=tabval.insertRow(i);

                var rnk= newr.insertCell(0);
                var coun= newr.insertCell(1);
                var code= newr.insertCell(2);
                var conf= newr.insertCell(3);
                var dea= newr.insertCell(4);
                var rec= newr.insertCell(5);
                var dr= newr.insertCell(6);
                var rr= newr.insertCell(7);

                rnk.innerHTML= i;
                coun.innerHTML= allCountries[i-1].Country;
                code.innerHTML= allCountries[i-1].CountryCode;
                conf.innerHTML= allCountries[i-1].TotalConfirmed;
                dea.innerHTML= allCountries[i-1].TotalDeaths;
                rec.innerHTML= allCountries[i-1].TotalRecovered;
                dr.innerHTML= Math.round(allCountries[i-1].TotalDeaths*10000/allCountries[i-1].TotalConfirmed)/100;
                rr.innerHTML= Math.round(allCountries[i-1].TotalRecovered*10000/allCountries[i-1].TotalConfirmed)/100;

                rnk.style.background= "#cccccc"
                coun.style.background= "#bf80ff";
                coun.style.color= "#fff";
                code.style.background= "#33adff";
                conf.style.background= "#ff9933";
                conf.style.color= "#fff";
                dea.style.background= "#ff4d4d";
                rec.style.background= "#5cd65c";
                rec.style.color= "#fff";
                dr.style.background= "#ff4d4d";
                rr.style.background= "#5cd65c";
                rr.style.color= "#fff";

                rnk.style.fontWeight= "750";
                coun.style.fontWeight= "650";
                code.style.fontWeight= "550";

            }
        }
    catch(err){
        console.log(err);
    }
}
document.getElementById("bdy").onload= getInfo;

async function sortInfo(prop){
    try
    {
            allCountries= await get_send(prop);
                if(allCountries==null)
                    throw allCountries;
        for(var i=1;i<=allCountries.length;i++)
        {

            var coun=tabval.rows[i].cells[1];
            var code=tabval.rows[i].cells[2];
            var conf=tabval.rows[i].cells[3];
            var dea=tabval.rows[i].cells[4];
            var rec=tabval.rows[i].cells[5];
            var dr= tabval.rows[i].cells[6];
            var rr= tabval.rows[i].cells[7];

            coun.innerHTML= allCountries[i-1].Country;
            code.innerHTML= allCountries[i-1].CountryCode;
            conf.innerHTML= allCountries[i-1].TotalConfirmed;
            dea.innerHTML= allCountries[i-1].TotalDeaths;
            rec.innerHTML= allCountries[i-1].TotalRecovered;
            dr.innerHTML= Math.round(allCountries[i-1].TotalDeaths*10000/allCountries[i-1].TotalConfirmed)/100;
            rr.innerHTML= Math.round(allCountries[i-1].TotalRecovered*10000/allCountries[i-1].TotalConfirmed)/100;
    
        }        
    }
    catch (err){
        console.log(err);
    }
}

document.getElementById("confi").addEventListener("click" ,()=>{
    sortInfo("TotalConfirmed");
});
document.getElementById("death").addEventListener("click", ()=>{
    sortInfo("TotalDeaths");
});
document.getElementById("recov").addEventListener("click" ,()=>{
    sortInfo("TotalRecovered");
});