///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var FileWatcher = require("./src/fileWatcher");
var fs = require("fs");
var open = require("open");

var haskellParser = new Haskell.HaskellParser();

var config = JSON.parse(fs.readFileSync(process.cwd() + "/hconfig.json").toString());

var server = new Server.Server(process.env.PORT || config.port, config);

var watchPaths = [config.projectSource + "/dist/test/"];

var fileWatcher = new FileWatcher.FileWatcher(watchPaths, function (path) {
    try  {
        var contents = haskellParser.parseFile(path);

        server.notifyConnections(contents);
    } catch (e) {
        console.log("couldn't parse " + path);
    }
});

server.start();
//# sourceMappingURL=app.js.map
