///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/node.d.ts'/>
var _ = require("underscore")._;

var chokidar = require("chokidar");

var FileWatcher = (function () {
    function FileWatcher(watchItems, callback) {
        var _this = this;
        this.watchers = [];
        var config = { ignored: /[\/\\]\./, persistent: true };

        _.forEach(watchItems, function (item) {
            var watcher = chokidar.watch(item, config);

            console.log("watching " + item);

            watcher.on('all', function (change, path) {
                console.log(path + change);
                callback(path);
            });

            _this.watchers.push(watcher);
        });
    }
    return FileWatcher;
})();
exports.FileWatcher = FileWatcher;
//# sourceMappingURL=fileWatcher.js.map
