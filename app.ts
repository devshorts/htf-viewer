///<reference path='_all.d.ts'/>

import Server       = require("./src/server");
import Haskell      = require("./src/parsers/haskell");
import FileWatcher  = require("./src/fileWatcher");
import Config       = require("./src/config");
import fs           = require("fs");
var open:any        = require("open");
var colors          = require("colors");

export class App{
    run(){
        var haskellParser = new Haskell.HaskellParser();

        var config = new Config.Config().getConfig();

        var server = new Server.Server(process.env.PORT || config.port, config);

        var watchPaths = [config.projectSource + "/dist/test/"];

        var fileWatcher = new FileWatcher.FileWatcher(watchPaths, path => {
            try{
                var contents = haskellParser.parseFile(path);

                server.notifyConnections(contents);

                console.log((path + " changed").cyan)
            }
            catch(e){

            }
        });

        server.start();

        open("http://localhost:" + server.port);
    }
}


