const fs = require("fs");

const dbPath = "./db/db.json";
var userNotes = [];

module.exports = function (app) {

    app.get("/api/notes", function(err, response) {
        try {
            userNotes = fs.readFileSync(dbPath, "utf8");
            userNotes = JSON.parse(userNotes);
        }
        catch (err) {
            console.log(err);
        }
        response.json(userNotes);
    });

    app.post("/api/notes", function(request, response) {
        try {
            userNotes = fs.readFileSync(dbPath, "utf8");
            console.log(userNotes);
            userNotes = JSON.parse(userNotes);
            request.body.id = userNotes.length + 1;
            userNotes.push(request.body);
            userNotes = JSON.stringify(userNotes);
            fs.writeFileSync(dbPath, userNotes, "utf8", function(err) {
                if(err) throw err;
            });
            response.json(JSON.parse(userNotes));
        }
        catch (err) {
            throw err;
        }
    });

    app.delete("/api/notes/:id", function(request, response) {
        console.log(request.params.id);
        try {
            userNotes = fs.readFileSync(dbPath, "utf8");
            userNotes = JSON.parse(userNotes);
            console.log(userNotes);
            userNotes = userNotes.filter(function(note) {
                return note.id != request.params.id;
            });
            console.log(userNotes);
            userNotes = JSON.stringify(userNotes);
            fs.writeFileSync(dbPath, userNotes, "utf8", function(err) {
                if(err) {throw err};
            });
            response.json(JSON.parse(userNotes));
        }
        catch(err) {
            throw err;
        }
    });
};
