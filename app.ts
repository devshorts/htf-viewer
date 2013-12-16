///<reference path='_all.d.ts'/>

import Server       = require("./src/server");
import Haskell      = require("./src/parsers/haskell");
import FileWatcher  = require("./src/fileWatcher");
import fs           = require("fs");
var open:any        = require("open");

var haskellParser = new Haskell.HaskellParser();

var config = JSON.parse(fs.readFileSync(process.cwd() + "/hconfig.json"));

var server = new Server.Server(process.env.PORT || 3000, config);

var watchPaths = [config.projectSource + "/dist/test/"];

var fileWatcher = new FileWatcher.FileWatcher(watchPaths, path => {
    try{
        var contents = haskellParser.parseFile(path);

        server.notifyConnections(contents);
    }
    catch(e){
        console.log("couldn't parse " + path);
    }
});

server.start();

//open("http://localhost:" + server.port);


