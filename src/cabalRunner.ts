///<reference path='../_all.d.ts'/>

import exec = require('child_process');

export class CabalRunner{
    constructor(public projectSource){}

    test(callback){
        exec.exec("cabal test",
            {
                cwd: this.projectSource
            },
            (error, stdout, stderr) => {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }

               callback();
            }
        )
    }
}