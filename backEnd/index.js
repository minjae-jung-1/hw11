const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");

const cors = require("cors");

var file = fs.readFileSync("./db.json");

var db = JSON.parse(file);

var app = express();

app.use(bodyParser());

var counter = 0;

app.use(cors({
    "orgin": "http://127.0.0.1:5500",
    "methods": ["GET", "POST", "OPTIONS", "PUT"]
}))

app.get("/notes", (req ,res)=>{
    console.log(db.notes)

    res.send(db.notes)
})

app.put("/notes", (req,res)=>{
    console.log(req.body);
    let id = req.body.id;
    db.notes = db.notes.map((note)=>{
        if(note.id === id){
            note = req.body
            console.log("running")
            return note
        }else{
            return note
        }
    })            
    res.send(db.notes)

})

app.post("/notes", (req,res)=>{
    let newNote = {};
   
    newNote.id = counter
    newNote.title = req.body.title || "";
    newNote.content = req.body.content || "";
    db.notes.push(newNote)
    counter += 1; 
    res.send(newNote)
    
})

app.listen(3000, ()=> {console.log("server running on port 3000")});
