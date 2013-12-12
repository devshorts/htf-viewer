///<reference path='_all.d.ts'/>

import Server = require("./src/server");
import Haskell = require("./src/parsers/haskell");

var server = new Server.Server();

server.start();

var haskellParser = new Haskell.HaskellParser();

var timer = () => setTimeout(() => {
        server.notifyConnections(haskellParser.parse(""));
        timer();
    }, 1000);

timer();

