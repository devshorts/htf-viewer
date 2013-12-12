///<reference path='../_all.d.ts'/>

import express = require('express');
import http = require('http');
import path = require('path');
import clientReloader = require('./clientReloader');

export class Server{

    private app = express();
    private reloader = new clientReloader.LiveReloader();

    constructor(){

    }

    notifyConnections(data?:any){
        this.reloader.trigger(data);
    }

    private initExpress(){
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
    }

    start (){
        this.initExpress();

        var local:Server = this;

        http.createServer(this.app).listen(this.app.get('port'), function(){
            console.log('Express server listening on port ' + local.app.get('port'));
        })
    }
}

