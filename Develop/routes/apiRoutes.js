const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
var holdData = [];

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

router.delete('/notes/:id', (req, res) => {
    holdData.forEach((item, index) => {
        if (item.id === req.params.id) {
            holdData.splice(index, 1);
        }
    })
    fs.writeFile(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(holdData),
        (err) => {
            if (err) {
                reject(err);
                return;
            }
        }); 
    res.json({
        message: 'successful removal',
        data: req.params.id
    });
});

module.exports = router;