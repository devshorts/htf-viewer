///<reference path='../_all.d.ts'/>
var express = require("express");
var path = require("path");
var _ = require('underscore')._;

var Tuple = (function () {
    function Tuple(req, res) {
        this.req = req;
        this.res = res;
    }
    return Tuple;
})();

var LiveReloader = (function () {
    function LiveReloader() {
        this.clients = [];
    }
    LiveReloader.prototype.data = function (client, data) {
        if (client.req.query.callback) {
            return client.req.query.callback + "(" + data + ")";
        } else {
            return data;
        }
    };

    LiveReloader.prototype.trigger = function (data) {
        _.forEach(this.clients, function (client) {
            try  {
                client.res.json(data);
            } catch (e) {
                console.log(e);
            }
        });

        this.clients = [];
    };

    LiveReloader.prototype.getMiddleWare = function () {
        var self = this;

        return function expressMiddleware(req, res, next) {
            if (req.path == "/longPoll") {
                self.clients.push(new Tuple(req, res));
            } else if (req.path == "/js/autoReload.js") {
                res.sendfile(path.resolve(__dirname, 'autoReload.js'));
            } else {
                next();
            }
        };
    };
    return LiveReloader;
})();
exports.LiveReloader = LiveReloader;
//# sourceMappingURL=clientReloader.js.map
