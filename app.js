///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var FileWatcher = require("./src/fileWatcher");

var open = require("open");

var _ = require('underscore')._;

var haskellParser = new Haskell.HaskellParser();

var server = new Server.Server(process.env.PORT || 3000);

var fileWatcher = new FileWatcher.FileWatcher(null, function (path) {
    return server.notifyConnections(haskellParser.parse(""));
});

server.start();

open("http://localhost:" + server.port);
//# sourceMappingURL=app.js.map
