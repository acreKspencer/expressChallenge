const express = require('express');
const {animals} = require('./data/animals.json');
const allNotes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const {uuid} = require('uuidv4');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function addNote(prevList, noteData){
    
    let notesList = prevList;
    console.log(notesList);
    notesList.allNotes.push(noteData);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesList, null, 2)
    );
    
    return noteData
    
}

function validateNote(noteData){
    if(noteData.noteTitle === '' || noteData.noteText === ''){
        return false
    }
    return true
}

app.get('/api/notes', (req, res) =>{
    

    let results= allNotes;
    console.log(results);
    res.json(results);
    
    


})



// http://localhost:3001/notes filling in json body on postman this works
app.post('/api/notes', (req, res) =>{
    req.body.id= uuid();
    //res.json(req.body);

    if(!validateNote(req.body)){
        res.status(400).send('The note is not properly filled out!');
        return
    }
 
    addNote(allNotes, req.body)
    res.json(allNotes);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
app.listen(PORT, () =>{
    console.log('API running on port 3001!');
})