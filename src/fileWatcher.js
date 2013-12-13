///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/node.d.ts'/>
var _ = require("underscore")._;

var chokidar = require("chokidar");

var FileWatcher = (function () {
    function FileWatcher(watchItems, callback) {
        var config = { ignored: /[\/\\]\./, persistent: true };

        var watcher = chokidar.watch("/Users/akropp/Projects/code/node/test-viewer", config);

        watcher.on('change', callback);
    }
    return FileWatcher;
})();
exports.FileWatcher = FileWatcher;
//# sourceMappingURL=fileWatcher.js.map
