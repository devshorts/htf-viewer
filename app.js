///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var open = require("open");

var _ = require('underscore')._;

var server = new Server.Server(process.env.PORT || 3000);

server.start();

var haskellParser = new Haskell.HaskellParser();

var timer = function () {
    return setTimeout(function () {
        server.notifyConnections(haskellParser.parse(""));
        timer();
    }, 5000);
};

timer();

open("http://localhost:" + server.port);
//# sourceMappingURL=app.js.map
