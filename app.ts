///<reference path='_all.d.ts'/>

import Server = require("./src/server");

var server = new Server.Server();

server.start();

var timer = () => setTimeout(() => {
        server.notifyConnections(new Date());
        timer();
    }, 1000);

timer();

