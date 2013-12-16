///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/colors.d.ts'/>


import exec = require('child_process');
var colors  = require("colors");

export class CabalRunner{
    constructor(public projectSource){}

    test(callback){
        exec.exec("cabal test",
            {
                cwd: this.projectSource
            },
            (error, stdout, stderr) => {

                console.log("cabal-test OK".green);

                callback();
            }
        )
    }
}