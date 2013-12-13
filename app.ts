///<reference path='_all.d.ts'/>

import Server = require("./src/server");
import Haskell = require("./src/parsers/haskell");
import FileWatcher = require("./src/fileWatcher");

var open:any = require("open");

var _ = require('underscore')._;

var haskellParser = new Haskell.HaskellParser();

var server = new Server.Server(process.env.PORT || 3000);

var fileWatcher = new FileWatcher.FileWatcher(null, path => server.notifyConnections(haskellParser.parse("")));

server.start();

open("http://localhost:" + server.port);

