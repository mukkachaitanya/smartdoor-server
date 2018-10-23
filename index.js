const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb){
            // user shortid.generate() alone if no extension is needed
            cb(null, path.parse(file.originalname).ext);
        }
    })
});

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const port = 3000;

app.post('/upload', (req, res) => {
    
    if(!req.body){
        res.end();
    }

    let img_encoded = req.body;
    let img = img_encoded.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("./upload/img.jpg", img, 'base64', function(err) {
        const { spawn } = require('child_process');
        const pyProg = spawn('python2', ['./../model/fig_chk.py', 'hell']);

        pyProg.stdout.on('data', function(data) {
            console.log(data.toString());
            res.write(data);
            res.end();
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))