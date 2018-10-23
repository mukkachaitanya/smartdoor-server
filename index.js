const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const pyScript = process.env.RECOG_SCRIPT;

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb){
            // user shortid.generate() alone if no extension is needed
            cb(null, file.originalname);
        }
    })
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const port = 3000;

app.post('/upload', upload.single('file'), (req, res) => {
    
    if(!req.body){
        res.end();
    }

    console.log(req.file);
    const pathImg = './' + req.file.path;
   
    const { spawn } = require('child_process');
    const pyProg = spawn('python2', [pyScript, pathImg]);

    process.stderr.pipe(pyProg.stderr);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
        res.end();
    });

    pyProg.on('error', (err) => {
        console.error(err);
        res.write('error');
        res.end();
    });
    
    pyProg.on('exit', (code, signal) => {
        console.log('child process exited with ' +
        `code ${code} and signal ${signal}`);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))