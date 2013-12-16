///<reference path='../_all.d.ts'/>

import express = require('express');
import http = require('http');
import path = require('path');
import clientReloader = require('./clientReloader');
var routes:any = require("./routes");

export class Server{

    private app = express();

    private reloader:clientReloader.LiveReloader;

    constructor(public port, public config){

    }

    notifyConnections(data?:any){
        this.reloader.trigger(data);
    }

    private initExpress(){
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
    }

    start (){
        this.initExpress();

        var server = http.createServer(this.app);

        this.reloader = new clientReloader.LiveReloader(server);

        server.listen(this.app.get('port'));
    }
}

