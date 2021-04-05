let addNoteBtn= document.getElementById("add");     //getting Add Note button reference

let updateLocalData= ()=>{
    let allNotesData= document.querySelectorAll('.takeinp');        //extract temp data from all notes
    let allExtractedData= [];              //storing allNotesData in an array
    allNotesData.forEach( (extract)=>{      //reference to each Note
        return allExtractedData.push(extract.value);       //pushing each Note Data to array
    });

    localStorage.setItem('storedData', JSON.stringify(allExtractedData));       //saving to local storage in JSON format
} 

let addNote= (dataPresent='')=>{       //add new note , arg1 for toggling between textarea and div

    let note= document.createElement('div');        //creating a new div
    note.classList.add('note');     //adding div specs through note class

    let dataHTML= `
    <div class="oper">
        <button class="edi"><i class="fas fa-edit"></i></button>
        <button class="del"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="showinp ${dataPresent ? "":"hide"}" ></div>
    <textarea class="takeinp ${dataPresent ? "hide":""}" ></textarea>   `;   //HTML template for each note, dataPresent used for toggle

    note.insertAdjacentHTML('afterbegin',dataHTML);     //adding HTML template to newly created div, specifying position of adding 

    let edi= note.querySelector(".edi");
    let del= note.querySelector(".del");            //taking appropriate references for edit, delete buttons, for alternating textarea and div
    let showinp= note.querySelector(".showinp");    //div for showing
    let takeinp= note.querySelector(".takeinp");    //textarea

    del.addEventListener('click', ()=> {
        note.remove() 
        updateLocalData();      //updating locally stored data on deleting
    });     //eventListener on del button deletes a note

    takeinp.value= dataPresent;
    showinp.innerHTML= dataPresent;

    edi.addEventListener('click', ()=>{     //toggle using edit button
        showinp.classList.toggle('hide');       //hide class- visibility hidden
        takeinp.classList.toggle('hide');       //toggle() funciton toggles between adding and removing class
    });

    takeinp.addEventListener('change', (event)=>{       //if eventListener detects change
        let val= event.target.value;                    //extracts value if any change occurs
        showinp.innerHTML= val;                         //updating the display value on the show div

        updateLocalData();              //updating change to local storage
    });

    document.body.appendChild(note);        //appending newly created to main body
};

let locallyStoredData= JSON.parse(localStorage.getItem('storedData'));       //getting back data from local storage

if(locallyStoredData){          //if any local data present, creating note for individual data
    locallyStoredData.forEach( (individualData)=> addNote(individualData)   );
}

addNoteBtn.addEventListener('click', ()=> addNote() );      //eventListener click on Add Note button, calling addNote() function