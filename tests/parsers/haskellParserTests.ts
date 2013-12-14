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

    var result = parser.parse(get("shortTest.sample"));

    console.log(result);

    test.equal(result.entries.length, 7, "Didn't parse 7 results");
    test.equal(result.entries[1].status.pass, false, "Didn't pick up on failed result");
    test.done();
}
