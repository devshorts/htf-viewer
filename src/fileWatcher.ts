///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/node.d.ts'/>

var _ = require("underscore")._;
import path = require("path");

var chokidar = require("chokidar");

export class FileWatcher{

    private watchers = [];


    constructor(watchItems:string[], callback:(path:string)=> void){
        var config = {ignored: /[\/\\]\./, persistent: true};

        _.forEach(watchItems, item => {
            var watcher = chokidar.watch(item, config);

            console.log("watching " + item);

            watcher.on('all', (change, path) => {
                console.log(path + change);
                callback(path);
            });

            this.watchers.push(watcher);
        });
    }
}