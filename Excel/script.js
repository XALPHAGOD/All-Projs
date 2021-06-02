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

const handleSelect= event=>{
    const prevSel= document.getElementsByClassName("selected");
    if(prevSel.length>0)
        prevSel[0].classList.remove("selected");
    event.target.classList.add("selected");
    const id= event.target.id.split(".");
    document.getElementById("sel-cell-disp").innerHTML= getColName(parseInt(id[1])) + id[0];
}

const col_name_row= document.createElement("div");
col_name_row.classList.add("rowCont-row");

const select_all= document.createElement("div");
select_all.id= "select-all";
select_all.innerHTML= "ALL";

col_name_row.appendChild(select_all);

for(let i=1;i<=cols;i++){
    const column_name= document.createElement("div");
    column_name.id= "colName-"+i.toString();
    column_name.classList.add("rc-name", "bb-thick");
    column_name.innerHTML= getColName(i);
    col_name_row.appendChild(column_name);
}

row_container.appendChild(col_name_row);

for(let i=1;i<=rows;i++){
    const rowCont_row= document.createElement("div");
    rowCont_row.classList.add("rowCont-row");
    
    const row_name= document.createElement("div");
    row_name.id= "rowName-"+i.toString();
    row_name.classList.add("rc-name", "br-thick");
    row_name.innerHTML= i;
    rowCont_row.appendChild(row_name);

    for(let j=1;j<=cols;j++){
        const cell= document.createElement("div");
        cell.setAttribute("contenteditable", "true");
        cell.id= i.toString()+"."+j.toString();
        cell.classList.add("cell");
        cell.addEventListener("click", event=>handleSelect(event));
        // cell.innerHTML= cell.id;
        rowCont_row.appendChild(cell);
    }
    row_container.appendChild(rowCont_row);
}