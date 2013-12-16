///<reference path='../_all.d.ts'/>
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require("./routes");
var clientReloader = require('./clientReloader');

var Server = (function () {
    function Server(port, config) {
        this.port = port;
        this.config = config;
        this.app = express();
    }
    Server.prototype.notifyConnections = function (data) {
        this.reloader.trigger(data);
    };

    Server.prototype.initExpress = function () {
        // all environments
        this.app.set('port', this.port);
        this.app.use(express.favicon());
        this.app.use(express.logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(express.methodOverride());
        this.app.use(this.app.router);
        this.app.use(express.static(path.join(__dirname, '../public')));

        routes(this.app, this.config);
    };

    Server.prototype.start = function () {
        this.initExpress();

        var server = http.createServer(this.app);

        this.reloader = new clientReloader.LiveReloader(server);

        server.listen(this.app.get('port'));
    };
    return Server;
})();
exports.Server = Server;
//# sourceMappingURL=server.js.map
