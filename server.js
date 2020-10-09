// Set up DEPENDENCIES
// =======================================================
const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();

// EXPRESS APP
// =======================================================

// Set up Express app to handle data parsing
const app = express();

// Set up Port
const PORT = process.env.PORT || 8080;

// Set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// ROUTER
// =======================================================
//SetS up routes for HTML

//Set up notes.html route
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//index.html route
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/index.html"));
//   });

//Set up API ROUTES
  // Parse note object
  // Create function to read current note data
  let dbNotes = fs.readFileSync(path.join(__dirname, "db/db.json"),"utf8");
  dbNotes = JSON.parse(dbNotes)

  app.get("/api/notes", function (req, res) {
      res.json(dbNotes)
  })
// Function used to write new notes to the database.

app.post("/api/notes", function (req,res){
    const newNoteObj = {
        title: req.body.title,
        text: req.body.text
    }

    dbNotes.push(newNoteObj)

    fs.writeFileSync(path.join(__dirname,"db/db.json"),JSON.stringify(dbNotes,null,2))
    res.send("test")
})

// Set up get /api/notes. should read the db.json file and return all saved json


//Set up POST /api/notes should recieve a new note to save on the request body.
  // Add new note to db.json file.
    // Return new note to client.



// DELETE
// =======================================================
//TODO: delete api/notes/:id


//TODO: receive a query parameter w/ id of note to delete.
//TODO: loop through db.json file to find propper id and remove note.
//TODO: rewrite the notes to the db.json file.


// =======================================================
// Set up listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});