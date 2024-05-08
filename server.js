// Load .env variables
if(process.env.NODE_ENV != 'production'){
    require("dotenv").config();
}

// Import Dependencies
const express = require('express');
const connectToDb = require("./config/connectToDb");
const Note = require('./models/note');

// Create an express app
const app = express();

// Connect to database
connectToDb();

// Configure express
app.use(express.json());

// Routing
app.get('/', (req, res) => {
    res.json({hello: 'world'});
});


app.get('/notes', async (req, res) => {
    // Find the notes
    const notes = await Note.find();
    // Respond with them
    res.json({ notes: notes });
});

app.get('/notes/:id', async (req, res) => {
    // Get id off the url
    const noteId = req.params.id;
    
    // Find the note using the id attribute
    const note = await Note.findById(noteId);
    console.log(note);

    // Respond with the note
    res.json({ note: note })
});

app.post('/notes', async (req, res) => {
    // Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;
    
    // create a note with it 
    const note = await Note.create({
        title: title,
        body: body,
    });

    // respond with the new note
    res.json({ note: note });

})

// Start the serve
app.listen(process.env.PORT);