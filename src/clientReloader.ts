///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>
///<reference path='../d.ts/vendor/colors.d.ts'/>

import express      = require("express");
import path         = require("path");
import Haskell      = require ("./parsers/haskell");
var io              = require("socket.io");
var _               = require('underscore')._;
var colors          = require("colors");

export class LiveReloader {

    private socketManager:SocketManager;

    constructor(server){

        this.socketManager = io.listen(server);

        this.socketManager.set('log level', 1);

        this.socketManager.sockets.on('connection', socket => {
            console.log("received client".blue);

            socket.on("disconnect", () => console.log("disconnected".blue));
        });

    }

    public trigger(data?:any){
        this.socketManager.sockets.json.emit("data", data);
    }
}