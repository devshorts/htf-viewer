///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>
var express = require("express");

var io = require("socket.io");
var _ = require('underscore')._;
var Haskell = require("./parsers/haskell");

var LiveReloader = (function () {
    function LiveReloader(server) {
        var _this = this;
        this.socketManager = io.listen(server);

        this.socketManager.set('log level', 1);

        this.socketManager.sockets.on('connection', function (socket) {
            console.log("received client");

            var contents = new Haskell.HaskellParser().parseFile(__dirname + "/../parsing samples/shortTest.sample");

            _this.trigger(contents);

            socket.on("disconnect", function () {
                return console.log("disconnected");
            });
        });
    }
    LiveReloader.prototype.trigger = function (data) {
        this.socketManager.sockets.json.emit("data", data);
    };
    return LiveReloader;
})();
exports.LiveReloader = LiveReloader;
//# sourceMappingURL=clientReloader.js.map
