var notesection = $("#notepad-container");

var notesArray = [];

function createNote(){
    axios.post("http://localhost:3000/notes")
    .then((res)=>{
        console.log(res.data)
        let noteHTML = ` <div id="notepad">${res.data.id+1}
        <input type="text" placeholder="Note Title" id="notepad-title-${res.data.id}"> 
        <textarea id="notepad-content-${res.data.id}" class="note-textarea" placeholder="Note Title" maxlength="100" type="text"></textarea>
    </div>` ;   
        notesection.append(noteHTML)
        let noteObj = {}
            noteObj.input = $(`#notepad-title-${res.data.id}`)
            noteObj.input.val(res.data.title) 
            noteObj.textarea = $(`#notepad-content-${res.data.id}`)
            noteObj.textarea.val(res.data.content) 
            notesArray.push(noteObj)

            noteObj.input.on("change", (event)=>{
                let updateValue = {};
                updateValue.id = res.data.id;
                updateValue.title = event.currentTarget.value;
                updateValue.content = noteObj.textarea.val()
                axios.put("http://localhost:3000/notes", updateValue)
            })
            noteObj.textarea.on("change", (event)=>{
                let updateValue = {};
                updateValue.id = res.data.id;
                updateValue.title = noteObj.input.val();
                updateValue.content = event.currentTarget.value
                axios.put("http://localhost:3000/notes", updateValue)               
            })
        }
        
            
    )
}

var addbutton = $("#addNote").on("click", ()=>{
    createNote()
})

function renderNotes(){
    axios.get("http://localhost:3000/notes")
    .then((res)=>{
        let notes = res.data
        for(let i = 0; i < notes.length; i++){
            let noteHTML = ` <div id="notepad">${res.data[i].id + 1}
            <input id="notepad-title-${res.data[i].id}" type="text" placeholder="Note Title"> 
            <textarea id="notepad-content-${res.data[i].id}" class="note-textarea" placeholder="Note Title" maxlength="100" type="text"></textarea>
        </div>`    
            notesection.append(noteHTML)
            let noteObj = {}
            noteObj.input = $(`#notepad-title-${res.data[i].id}`)
            noteObj.input.val(res.data[i].title) 
            noteObj.textarea = $(`#notepad-content-${res.data[i].id}`)
            noteObj.textarea.val(res.data[i].content) 
            notesArray.push(noteObj)
        }
        notesArray.forEach((note, index) => {
            note.input.on("change", (event)=>{
                let updateValue = {};
                updateValue.id = index;
                updateValue.title = event.currentTarget.value;
                updateValue.content = note.textarea.val()
                axios.put("http://localhost:3000/notes", updateValue)


                console.log(index)
                console.log(event.currentTarget.value)
                console.log(note.textarea.val())
                

            })
            note.textarea.on("change", (event)=>{
                let updateValue = {};
                updateValue.id = index;
                updateValue.title = note.input.val();
                updateValue.content = event.currentTarget.value
                axios.put("http://localhost:3000/notes", updateValue)               
            })
        })
    })
}
renderNotes();

