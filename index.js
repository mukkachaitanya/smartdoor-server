const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb', extended: true},)); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true},)); // for parsing application/x-www-form-urlencoded

const port = 3000;

app.post('/upload', (req, res) => {
    console.log(req.body);
    res.send("Verified");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))