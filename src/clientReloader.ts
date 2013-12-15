///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>

import express = require("express");
import path = require("path");
var io = require("socket.io");
var _ = require('underscore')._;
var Haskell = require ("./parsers/haskell");


export class LiveReloader {

    private socketManager:SocketManager;

    constructor(server){

        this.socketManager = io.listen(server);

        this.socketManager.set('log level', 1);

        this.socketManager.sockets.on('connection', socket => {
            console.log("received client");

            var contents = new Haskell.HaskellParser().parseFile('/Users/akropp/Projects/code/Playground/ht1/dist/test/ht1-0.1.0.0-Ht1Tests.log');

            this.trigger(contents);

            socket.on("disconnect", () => console.log("disconnected"));
        });

    }

    public trigger(data?:any){
        this.socketManager.sockets.json.emit("data", data);
    }
}