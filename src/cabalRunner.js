///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/colors.d.ts'/>
var exec = require('child_process');
var colors = require("colors");

var CabalRunner = (function () {
    function CabalRunner(projectSource) {
        this.projectSource = projectSource;
    }
    CabalRunner.prototype.test = function (callback) {
        exec.exec("cabal test", {
            cwd: this.projectSource
        }, function (error, stdout, stderr) {
            console.log("cabal-test OK".green);

            callback();
        });
    };
    return CabalRunner;
})();
exports.CabalRunner = CabalRunner;
//# sourceMappingURL=cabalRunner.js.map
