const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

router.get('/notes', (req,res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            reject(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

router.post('/notes', ({ body },res) => {
    body.id = uuid.v4();
    fs.writeFile(path.join(__dirname, '../db/db.json'), req.body, (err) => {
        if (err) {
            reject(err);
            return;
        } 
    }); 
    res.json(req.body);
});

module.exports = router;