///<reference path='../_all.d.ts'/>
var express = require('express');
var http = require('http');
var path = require('path');
var clientReloader = require('./clientReloader');

var Server = (function () {
    function Server() {
        this.app = express();
        this.reloader = new clientReloader.LiveReloader();
    }
    Server.prototype.notifyConnections = function (data) {
        this.reloader.trigger(data);
    };

    Server.prototype.initExpress = function () {
        // all environments
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.favicon());
        this.app.use(express.logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(express.methodOverride());
        this.app.use(this.app.router);
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(this.reloader.getMiddleWare());
    };

    Server.prototype.start = function () {
        this.initExpress();

        var local = this;

        http.createServer(this.app).listen(this.app.get('port'), function () {
            console.log('Express server listening on port ' + local.app.get('port'));
        });
    };
    return Server;
})();
exports.Server = Server;
//# sourceMappingURL=server.js.map
