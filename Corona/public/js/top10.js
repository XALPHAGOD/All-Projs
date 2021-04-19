const url= `https://api.covid19api.com/summary`;



const tabval= document.getElementById("tabval");



const getInfo= async (event)=>{
    event.preventDefault();
    try{
        function comparator(prop){
            return function(a,b){
                return b[prop]-a[prop];
            }
        }
        const allCountries= (await (await fetch(url)).json()).Countries;
        allCountries.sort(comparator("TotalConfirmed"));
            var newr=tabval.insertRow(0);

            var coun= newr.insertCell(0);
            var code= newr.insertCell(1);
            var conf= newr.insertCell(2);
            var dea= newr.insertCell(3);
            var rec= newr.insertCell(4);

            coun.innerHTML= "Country";
            code.innerHTML= "Country Code";
            conf.innerHTML= "Total Confirmed";
            dea.innerHTML= "Total Deaths";
            rec.innerHTML= "Total Recovered";

            coun.style.fontWeight= "750";
            code.style.fontWeight= "750";
            conf.style.fontWeight= "750";
            dea.style.fontWeight= "750";
            rec.style.fontWeight= "750";

            coun.style.fontSize= "large";
            code.style.fontSize= "large";
            conf.style.fontSize= "large";
            dea.style.fontSize= "large";
            rec.style.fontSize= "large";

        for(var i=1;i<=10;i++){

            var newr=tabval.insertRow(i);

            var coun= newr.insertCell(0);
            var code= newr.insertCell(1);
            var conf= newr.insertCell(2);
            var dea= newr.insertCell(3);
            var rec= newr.insertCell(4);

            coun.innerHTML= allCountries[i-1].Country;
            code.innerHTML= allCountries[i-1].CountryCode;
            conf.innerHTML= allCountries[i-1].TotalConfirmed;
            dea.innerHTML= allCountries[i-1].TotalDeaths;
            rec.innerHTML= allCountries[i-1].TotalRecovered;

            coun.style.background= "#bf80ff";
            coun.style.color= "#fff";
            code.style.background= "#33adff";
            conf.style.background= "#ff9933";
            conf.style.color= "#fff";
            dea.style.background= "#ff4d4d";
            rec.style.background= "#5cd65c";
            rec.style.color= "#fff";

        }
    }catch(err){
        console.log(err);
    }
}
document.getElementById("bdy").onload= getInfo;