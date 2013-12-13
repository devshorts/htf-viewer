///<reference path="../../_all.d.ts"/>
///<reference path='../../d.ts/vendor/nodeunit.d.ts'/>

import Haskell = require("../../src/parsers/haskell");
import fs = require("fs");
import path = require("path");

var parser = new Haskell.HaskellParser();

function get(file){
    return fs.readFileSync(__dirname + "/../../parsing samples/" + file, 'utf8').toString();
}

export function parseHaskell(test:INodeUnitTest){
    var contents = get("shortTest.sample");

    var result = parser.parseReal(contents);

    console.log(result);

    test.done();
}
