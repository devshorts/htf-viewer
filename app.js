///<reference path='_all.d.ts'/>
var Server = require("./src/server");

var server = new Server.Server();

server.start();

var timer = function () {
    return setTimeout(function () {
        server.notifyConnections(new Date());
        timer();
    }, 1000);
};

timer();
//# sourceMappingURL=app.js.map
