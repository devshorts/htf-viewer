///<reference path='../_all.d.ts'/>

import express = require("express");
import path = require("path");
var _ = require('underscore')._;



class Tuple{
    constructor(public req:express.Request, public res:express.Response){

    }
}

export class LiveReloader {
    private clients:Tuple[] = [];

    private data(client:Tuple, data?:any){
        if(client.req.query.callback){
            return client.req.query.callback + "(" + data + ")";
        }
        else{
            return data;
        }
    }

    public trigger(data?:any){

        _.forEach(this.clients, (client:Tuple) => {
            try{
                client.res.json(data);
            }
            catch(e){
                console.log(e);
            }
        });

        this.clients = [];
    }

    public getMiddleWare():Function{
        var self:LiveReloader = this;

        return function expressMiddleware(req: express.Request, res: express.Response, next?: Function) : void{
            if(req.path == "/longPoll"){
                self.clients.push(new Tuple(req, res));
            }
            else if(req.path == "/js/autoReload.js"){
                res.sendfile(path.resolve(__dirname, 'autoReload.js'));
            }
            else{
                next();
            }
        }
    }
}