///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var FileWatcher = require("./src/fileWatcher");
var Config = require("./src/config");

var open = require("open");
var colors = require("colors");

var haskellParser = new Haskell.HaskellParser();

var config = new Config.Config().getConfig();

var server = new Server.Server(process.env.PORT || config.port, config);

var watchPaths = [config.projectSource + "/dist/test/"];

var fileWatcher = new FileWatcher.FileWatcher(watchPaths, function (path) {
    try  {
        var contents = haskellParser.parseFile(path);

        server.notifyConnections(contents);

        console.log((path + " changed").cyan);
    } catch (e) {
    }
});

server.start();

open("http://localhost:" + server.port);
//# sourceMappingURL=app.js.map
