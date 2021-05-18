const generate= (n)=>{
    const disp= document.getElementById("display");
    while(disp.firstChild){
        disp.removeChild(disp.firstChild);
    }
    let heights= []
    for(let i=0;i<n;i++)
        heights.push(parseInt(Math.random()*500)+1);
    let arr= []
    for(let i=0;i<n;i++)
    {
        const div= document.createElement("div");
        div.style.width= "10px";
        div.style.height= heights[i]+ "px";
        div.style.marginRight= "1px";
        div.style.backgroundColor= "red";
        disp.appendChild(div);
        arr.push(div);
    }
    return arr;
}

const waitDelay= async (delay)=>{
    await new Promise(resolve=>setTimeout(()=>resolve(), delay*10));
}

const swap= (a, b)=>{
    let t= a.style.height;
    a.style.height= b.style.height;
    b.style.height= t;
}
