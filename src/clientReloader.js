///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>
///<reference path='../d.ts/vendor/colors.d.ts'/>
var express = require("express");

var io = require("socket.io");
var _ = require('underscore')._;
var colors = require("colors");

var LiveReloader = (function () {
    function LiveReloader(server) {
        this.socketManager = io.listen(server);

        this.socketManager.set('log level', 1);

        this.socketManager.sockets.on('connection', function (socket) {
            console.log("received client".blue);

            socket.on("disconnect", function () {
                return console.log("disconnected".blue);
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
