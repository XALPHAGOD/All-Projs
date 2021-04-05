// GET https://icanhazdadjoke.com/
const fact=document.querySelector("#ldn");

// nextFact= ()=>{
//    
//     let setHeader= {
//         headers: {
//             Accept: "application/json"
//         }
//     }
//     fetch("https://icanhazdadjoke.com",setHeader).then( (res)=> res.json() ).then( (data)=>{        //using promises
//         fact.innerHTML= data.joke;
//     }).catch( (err)=>{
//         console.log(err);
//     })
// }



nextFact= async()=>{

    try{
        
        let setHeader= {
            headers: {
                Accept: "application/json"
            }
        }

        let res= await fetch("https://icanhazdadjoke.com",setHeader)        //using async await
        let data= await res.json();
        fact.innerHTML= data.joke;

    }catch(err){
        console.log(err);
    }
    
}


document.querySelector("#btn").addEventListener("click", nextFact);
nextFact();