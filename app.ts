///<reference path='_all.d.ts'/>
///<reference path='d.ts/interfaces.d.ts'/>

import Server       = require("./src/server");
import Haskell      = require("./src/parsers/haskell");
import FileWatcher  = require("./src/fileWatcher");
import Config       = require("./src/config");
import fs           = require("fs");
var open:any        = require("open");
var colors          = require("colors");
var _               = require("underscore")._;

export class App{
    run(parsers:IParser[]){
        if(_.isUndefined(parsers)){
            parsers = [];
        }

        parsers.push(new Haskell.HaskellParser());

        var config = new Config.Config().getConfig();

        var server = new Server.Server(process.env.PORT || config.port, config);

        var watchPaths = [config.projectSource + "/dist/test/"];

        var fileWatcher = new FileWatcher.FileWatcher(watchPaths, path => {
            try{
                for(var i = 0; i< parsers.length; i++){
                    var contents = parsers[i].parseFile(path);

                    server.notifyConnections(contents);

                    console.log((path + " changed").cyan);

                    return;
                }
            }
            catch(e){

            }
        });

        server.start();

        open("http://localhost:" + server.port);
    }
}


