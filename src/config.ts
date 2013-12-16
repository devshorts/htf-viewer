///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/node.d.ts'/>
///<reference path='../d.ts/vendor/colors.d.ts'/>
///<reference path='../d.ts/interfaces.d.ts'/>


var fs      = require("fs");
var path    = require("path");
var _       = require("underscore")._;
var colors  = require('colors');

export class Config{

    getConfig():ConfigData{
        var defaults:ConfigData = {
            projectSource: process.cwd(),
            port: 3000
        };

        var config = defaults;

        var overrideConfigPath = process.cwd() + "/hconfig.json";

        if(fs.existsSync(overrideConfigPath)){
            console.log(("found config path @ " + overrideConfigPath).yellow);

            config = _.defaults(JSON.parse(fs.readFileSync(overrideConfigPath).toString()), defaults);
        }
        else{
            console.log("using default config".yellow);
        }

        console.log(("Source Dir: " + config.projectSource).green);
        console.log(("Port: " + config.port).green);

        return config;
    }
}