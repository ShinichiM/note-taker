const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
var holdData;

router.get('/notes', (req,res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            reject(err);
            return;
        }
        holdData = JSON.parse(data);
        res.json(JSON.parse(data));
    });
});

router.post('/notes', ({ body },res) => {
    body.id = uuid.v4();
    holdData.push(body);
    fs.writeFile(
        path.join(__dirname, '../db/db.json'), JSON.stringify(holdData), (err) => {
            if (err) {
                reject(err);
                return;
            }
        }
    );
        res.json(body);
});

module.exports = router;