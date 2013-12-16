///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/express.d.ts'/>
var CabalRunner = require("../cabalRunner");

var ServerRoutes = (function () {
    function ServerRoutes(app, config) {
        app.get("/cabal-test", function (req, res) {
            var runner = new CabalRunner.CabalRunner(config.projectSource);

            runner.test(function () {
                res.send("OK");
            });
        });
    }
    return ServerRoutes;
})();
exports.ServerRoutes = ServerRoutes;
//# sourceMappingURL=serverRoutes.js.map
