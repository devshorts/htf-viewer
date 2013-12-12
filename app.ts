///<reference path='_all.d.ts'/>

import Server = require("./src/server");
import Haskell = require("./src/parsers/haskell");

var _ = require('underscore')._;

var server = new Server.Server();

server.start();

var haskellParser = new Haskell.HaskellParser();

var timer = () => setTimeout(() => {
        server.notifyConnections(haskellParser.parse(""));
        timer();
    }, 5000);

timer();

