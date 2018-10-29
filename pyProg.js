const { spawn } = require('child_process');

const runPyProg = (script, res, blink = false) => {
    const pyProg = spawn('python2', script);

    process.stderr.pipe(pyProg.stderr);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
        if(blink && data.toString() === 'True\n'){
            spawn('python2', ['./rpi-ctrllr/led.py']);
        }
        res.end();
    });

    pyProg.on('error', (err) => {
        console.error(err);
        res.write('error');
        res.end();
    });
    
    pyProg.on('exit', (code, signal) => {
        console.log(`child process exited with
        code ${code} and signal ${signal}`);
        if(!res.finished){
            res.write(`${code>0 ? 'error' : 'success'}`);
            res.end();
        }
    });
}

module.exports = {
    runPyProg
};