const row_container= document.getElementById("row-container");

const dim= 50;
const rows= dim;
const cols= dim;

const getColName= (num)=>{
    let string= ""
    while(num>0){
        string= String.fromCharCode((num-1)%26 + 65)+ string;
        num=parseInt((num-1)/26);
    }
    return string;
}

let flag=false;
let r1=0, c1=0;

const handleSelect= event=>{

    const prevSel= document.querySelectorAll(".selected");
    // console.log(prevSel);

    if(prevSel.length>0){
        for(let i=0;i<prevSel.length;i++){
            prevSel[i].setAttribute("contenteditable", "false");
            prevSel[i].classList.remove("selected", "selected-cell", "bt", "bb", "bl", "br");
        }
    }

    if(event.ctrlKey && !flag){
        [r1, c1]= event.target.id.split(".");
        flag=true;
    }
    else if(event.ctrlKey){
        const [r2, c2]= event.target.id.split(".");
        document.getElementById("sel-cell-disp").innerHTML= getColName(parseInt(c1)) + r1.toString();
        const sr=Math.min(r1,r2);
        const er=Math.max(r1,r2);
        const sc=Math.min(c1,c2);
        const ec=Math.max(c1,c2);

        for(let i=sr;i<=er;i++){
            for(let j=sc;j<=ec;j++){
                const reqElem= document.getElementById(i.toString()+"."+j.toString());
                reqElem.classList.add("selected");

                if(i==sr)
                    reqElem.classList.add("bt");
                if(i==er)
                    reqElem.classList.add("bb");
                if(j==sc)
                    reqElem.classList.add("bl");
                if(j==ec)
                    reqElem.classList.add("br");
            }
        }
        flag=false;
    }
    else{
        event.target.classList.add("selected", "selected-cell");
        const id= event.target.id.split(".");
        document.getElementById("sel-cell-disp").innerHTML= getColName(parseInt(id[1])) + id[0];
    }
}

function handleDblClick(evt){
    const prevSel= document.querySelectorAll(".selected");

    if(prevSel.length>0){
        for(let i=0;i<prevSel.length;i++){
            prevSel[i].setAttribute("contenteditable", "false");
            prevSel[i].classList.remove("selected", "selected-cell", "bt", "bb", "bl", "br");
        }
    }

    evt.target.classList.add("selected", "selected-cell");
    evt.target.setAttribute("contenteditable", "true");
    evt.target.focus();
    const id= evt.target.id.split(".");
    document.getElementById("sel-cell-disp").innerHTML= getColName(parseInt(id[1])) + id[0];
}

const row_name_cont= document.getElementById("row-name-cont");

for(let i=1;i<=rows;i++){
    const row_name= document.createElement("div");
    row_name.classList.add("row-name", "centralize");
    row_name.id= "rowName-"+i.toString();
    row_name.innerHTML= i;
    row_name_cont.appendChild(row_name);
}

const col_name_cont= document.getElementById("col-name-cont");

for(let i=1;i<=cols;i++){
    const col_name= document.createElement("div");
    col_name.classList.add("col-name", "centralize");
    col_name.id= "colName-"+i.toString();
    col_name.innerHTML= getColName(i);
    col_name_cont.appendChild(col_name);
}

const cells_cont= document.getElementById("cells-cont");

for(let i=1;i<=rows;i++){
    const cells_cont_row= document.createElement("div"); 
    cells_cont_row.classList.add("cells-cont-row");
    cells_cont_row.id= "cellsContRow"+i.toString();
    
    for(let j=1;j<=cols;j++){
        const cell= document.createElement("div");
        cell.id= i.toString()+"."+j.toString();
        cell.classList.add("cell");
        cell.addEventListener("click", event=>handleSelect(event));
        cell.addEventListener("dblclick", event=>handleDblClick(event));
        cells_cont_row.appendChild(cell);
    }
    cells_cont.appendChild(cells_cont_row);
}

cells_cont.addEventListener("scroll", ()=>{
    // console.log(cells_cont.scrollLeft, cells_cont.scrollTop);
    col_name_cont.scrollLeft= cells_cont.scrollLeft;
    row_name_cont.scrollTop= cells_cont.scrollTop;
});

document.getElementById("bold-btn").addEventListener("click",()=>{
    const prevSel= document.querySelectorAll(".selected");
    if(prevSel.length>0){
        if(prevSel[0].classList.contains("bold")){
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.remove("bold");
        }
        else{
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.add("bold");
        }
    }
});

document.getElementById("italic-btn").addEventListener("click",()=>{
    const prevSel= document.querySelectorAll(".selected");
    if(prevSel.length>0){
        if(prevSel[0].classList.contains("italic")){
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.remove("italic");
        }
        else{
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.add("italic");
        }
    }
});

document.getElementById("underline-btn").addEventListener("click",()=>{
    const prevSel= document.querySelectorAll(".selected");
    if(prevSel.length>0){
        if(prevSel[0].classList.contains("underline")){
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.remove("underline");
        }
        else{
            for(let i=0;i<prevSel.length;i++)
                prevSel[i].classList.add("underline");
        }
    }
});