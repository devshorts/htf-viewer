///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>
var express = require("express");

var io = require("socket.io");
var _ = require('underscore')._;

var LiveReloader = (function () {
    function LiveReloader(server) {
        io = io.listen(server);

        io.set('log level', 1);

        io.sockets.on('connection', function (socket) {
            console.log("recieved client");

            socket.on("disconnect", function () {
                return console.log("disconnected");
            });
        });
    }
    LiveReloader.prototype.trigger = function (data) {
        io.sockets.json.emit("data", data);
    };
    return LiveReloader;
})();
exports.LiveReloader = LiveReloader;
//# sourceMappingURL=clientReloader.js.map
