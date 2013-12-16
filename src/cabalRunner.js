///<reference path='../_all.d.ts'/>
var exec = require('child_process');

var CabalRunner = (function () {
    function CabalRunner(projectSource) {
        this.projectSource = projectSource;
    }
    CabalRunner.prototype.test = function (callback) {
        exec.exec("cabal test", {
            cwd: this.projectSource
        }, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }

            callback();
        });
    };
    return CabalRunner;
})();
exports.CabalRunner = CabalRunner;
//# sourceMappingURL=cabalRunner.js.map
