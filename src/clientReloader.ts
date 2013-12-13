///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/socket.io.d.ts'/>

import express = require("express");
import path = require("path");
var io = require("socket.io");
var _ = require('underscore')._;



export class LiveReloader {

    constructor(server){

        io = io.listen(server);

        io.set('log level', 1);

        io.sockets.on('connection', socket => {
            console.log("recieved client");

            socket.on("disconnect", () => console.log("disconnected"));
        });

    }

    public trigger(data?:any){
        io.sockets.json.emit("data", data);
    }
}