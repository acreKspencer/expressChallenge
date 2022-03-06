const fs = require('fs');
const notes = JSON.parse(fs.readFileSync(`${__dirname}/../../../../db/db.json`));



exports.grabNotes=(req, res) =>{

    res.status(200).json({
        status: 'success',
        results: notes.length,
        data: {
            notes: notes
        }

    })
}