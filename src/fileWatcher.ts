///<reference path='../_all.d.ts'/>
///<reference path='../d.ts/vendor/node.d.ts'/>

var _ = require("underscore")._;
import path = require("path");

var chokidar = require("chokidar");

export class FileWatcher{

    constructor(watchItems:string[], callback:(path:string)=> void){
        var config = {ignored: /[\/\\]\./, persistent: true};

        var watcher = chokidar.watch("/Users/akropp/Projects/code/node/test-viewer", config);

        watcher.on('change', callback);
    }
}