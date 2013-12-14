///<reference path='_all.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var FileWatcher = require("./src/fileWatcher");
var open = require("open");

var haskellParser = new Haskell.HaskellParser();

var config = {
    watch: ["/Users/akropp/Projects/code/Playground/ht1/dist/test/"]
};

var server = new Server.Server(process.env.PORT || 3000);

var fileWatcher = new FileWatcher.FileWatcher(config.watch, function (path) {
    try  {
        var contents = haskellParser.parseFile(path);

        server.notifyConnections(contents);
    } catch (e) {
        console.log("couldn't parse " + path);
    }
});

server.start();

open("http://localhost:" + server.port);
//# sourceMappingURL=app.js.map
