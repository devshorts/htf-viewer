///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");

var server = new Server.Server();

server.start();

var haskellParser = new Haskell.HaskellParser();

var timer = function () {
    return setTimeout(function () {
        server.notifyConnections(haskellParser.parse(""));
        timer();
    }, 1000);
};

timer();
//# sourceMappingURL=app.js.map
