const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const { runPyProg } = require('./pyProg');
const { Logger } = require('./logger');

const config = require('./config.json');
const pyScript = path.resolve(config.recognitionScript);
const userScript = path.resolve(config.userAddScript);
const deleteScript = path.resolve(config.deleteScript);

var systemStatus = true;

Logger.log(`Python Script ${pyScript}`);
Logger.log(`User add script ${userScript}`);
Logger.log(`User delete script ${deleteScript}`);

const tmpRecognition = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }
    })
});

const knownImages = multer({
    storage: multer.diskStorage({
        destination: './model/known_images',
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = config.port || 3000;


// recognition path
app.post('/upload', tmpRecognition.single('file'), (req, res) => {
    
    if(!req.body){
        res.write('invalid request');
        res.end();
    }

    Logger.log(`Upload for recog ${JSON.stringify(req.file)}`);
    const pathImg = './' + req.file.path;
    
    if(!systemStatus)
        res.end('System off, can\'t enter!');
    else
        runPyProg([pyScript, pathImg], res, systemStatus);
});


// admin user paths
app.post('/new-user', knownImages.single('file'), (req, res) => {
    
    if(!req.body){
        res.write('invalid request');
        res.end();
    }

    Logger.log(`Upload for new user ${JSON.stringify(req.file)}`);
    const pathImg = './' + req.file.path;
    const name = req.body.name || req.file.filename.split('.')[0];
    Logger.log(`Delete name`);
   
    runPyProg([userScript, name ,pathImg], res);
});

 
app.post('/delete-user', (req, res) => {

    if(!req.body){
        res.write('invalid request');
        res.end();
    }

    Logger.log(`Delete ${JSON.stringify(req.body)}`);
    const name = req.body.name;

    runPyProg([deleteScript, name], res);

});


// admin auth paths
app.post('/admin', (req, res) => {
    Logger.log('Admin login');
    if(req.body && req.body.username === 'admin'){
        fs.readFile('./credentials', (err, encodedPassword) => {
            const password = Buffer.from(encodedPassword.toString(), 'base64').toString();
            if(password === req.body.password){
                res.write('Login Successful');
            } else {
                res.write('Login unsuccessful');
            }
            res.end();
        });
    } else {
        res.write('Wrong username');
        res.end();
    }
});

app.post('/password', (req, res) => {
    Logger.log('password change');
    if (req.body && req.body.password) {
        const password = Buffer.from(req.body.password).toString('base64');
        fs.writeFile('./credentials', password, (err) => {
            res.write('Updated');
            res.end();
        });
    } else {
        res.write('Password not provided');
        res.end();
    }
});

app.post('/door', (req, res) => {
    Logger.log(`Toggle system status ${!systemStatus}`);
    systemStatus = !systemStatus;
    res.end(`System ${systemStatus ? 'on' : 'off'}`);
})

app.listen(port, () => console.log(`Smartdoor app listening on port ${port}!`))
