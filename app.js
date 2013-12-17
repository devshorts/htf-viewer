///<reference path='_all.d.ts'/>
///<reference path='d.ts/interfaces.d.ts'/>
var Server = require("./src/server");
var Haskell = require("./src/parsers/haskell");
var FileWatcher = require("./src/fileWatcher");
var Config = require("./src/config");

var open = require("open");
var colors = require("colors");
var _ = require("underscore")._;

var App = (function () {
    function App() {
    }
    App.prototype.run = function (parsers) {
        if (_.isUndefined(parsers)) {
            parsers = [];
        }

        parsers.push(new Haskell.HaskellParser());

        var config = new Config.Config().getConfig();

        var server = new Server.Server(process.env.PORT || config.port, config);

        var watchPaths = [config.projectSource + "/dist/test/"];

        var fileWatcher = new FileWatcher.FileWatcher(watchPaths, function (path) {
            try  {
                for (var i = 0; i < parsers.length; i++) {
                    var contents = parsers[i].parseFile(path);

                    server.notifyConnections(contents);

                    console.log((path + " changed").cyan);

                    return;
                }
            } catch (e) {
            }
        });

        server.start();

        open("http://localhost:" + server.port);
    };
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map
