///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/node.d.ts'/>
///<reference path='../../d.ts/vendor/underscore.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>
var dto = require("./testDto");

var _ = require('underscore')._;
var Parsimmon = require('parsimmon');

var regex = Parsimmon.regex;
var str = Parsimmon.string;
var optWhitespace = Parsimmon.optWhitespace;

var HaskellParser = (function () {
    function HaskellParser() {
    }
    HaskellParser.prototype.parse = function (contents) {
        var testFixture = new dto.TestFixtureDto();

        testFixture.fixtureName = "test";
        testFixture.tests = _.range(Math.floor((Math.random() * 100) + 1)).map(function (i) {
            return new dto.TestDto().withLineNum(Math.random()).withName(Math.random().toString());
        });

        return [testFixture];
    };

    HaskellParser.prototype.parseReal = function (contents) {
        var id = function (i) {
            return i;
        };

        var testKeyword = str("[TEST]");

        var between = function (parser, a, b) {
            return str(a).then(parser).skip(str(b)).map(id);
        };

        var haskellSuffix = str(".hs");
        var running = str("RUNNING...");
        var semicolon = str(":");

        var word = regex("/[A-Z][a-z]*");

        var testSuite = str("Test suite").skip(optWhitespace).then(word).skip(semicolon).skip(optWhitespace).skip(running).skip(optWhitespace).map(id);

        var testName = testKeyword.skip(str("TestFixtures:")).then(word).map(id);

        var fileName = regex("/.*\.hs/").map(id);

        var sourceFile = optWhitespace.then(between(fileName, "(", ")")).map(id);

        var lineNumber = optWhitespace.skip(semicolon).then(Parsimmon.digits).map(parseInt);
    };
    return HaskellParser;
})();
exports.HaskellParser = HaskellParser;
//# sourceMappingURL=haskell.js.map
