///<reference path="../../_all.d.ts"/>
///<reference path='../../d.ts/vendor/nodeunit.d.ts'/>
var Haskell = require("../../src/parsers/haskell");
var fs = require("fs");

var parser = new Haskell.HaskellParser();

function get(file) {
    return fs.readFileSync(__dirname + "/../../parsing samples/" + file, 'utf8').toString();
}

function parseHaskell(test) {
    var contents = get("shortTest.sample");

    var result = parser.parseReal(contents);

    console.log(result);

    test.done();
}
exports.parseHaskell = parseHaskell;
//# sourceMappingURL=haskellParserTests.js.map
