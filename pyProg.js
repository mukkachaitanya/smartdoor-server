const { spawn } = require('child_process');

const { Logger } = require('./logger');

const runPyProg = (script, res, blink = false) => {
    const pyProg = spawn('python2', script);

    process.stderr.pipe(pyProg.stderr);

    pyProg.stdout.on('data', function(data) {
        Logger.log(data.toString());
        res.write(data);
        if(blink && data.toString().includes('Verified')){
            spawn('python2', ['./rpi-ctrllr/led.py']);
        }
        res.end();
    });

    pyProg.on('error', (err) => {
        Logger.log(err);
        res.write('error');
        res.end();
    });
    
    pyProg.on('exit', (code, signal) => {
        Logger.log(`child process exited with
        code ${code} and signal ${signal}`);
        if(!res.finished){
            res.write(`${code>0 ? 'Error!' : 'Success!'}`);
            res.end();
        }
    });
}

module.exports = {
    runPyProg
};