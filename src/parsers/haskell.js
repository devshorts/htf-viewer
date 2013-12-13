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
        this.testKeyword = str("[TEST]");
        this.running = str("RUNNING...");
        this.colon = str(":");
        this.word = regex(/^([A-Z]|[a-z]|[0-9]|_)*/);
    }
    HaskellParser.prototype.parse = function (contents) {
        var testFixture = new dto.TestFixtureDto();

        testFixture.fixtureName = "test";
        testFixture.tests = _.range(Math.floor((Math.random() * 100) + 1)).map(function (i) {
            return new dto.TestDto().withLineNum(Math.random()).withName(Math.random().toString());
        });

        return [testFixture];
    };

    HaskellParser.prototype.parseFile = function (contents) {
        var _this = this;
        var file = this.testSuite().then(function (suite) {
            return _this.test().many().map(function (entries) {
                return {
                    suite: suite,
                    entries: entries
                };
            });
        }).skip(Parsimmon.all);

        return file.parse(contents);
    };

    HaskellParser.prototype.between = function (parser, a, b) {
        return str(a).then(parser).skip(str(b));
    };

    HaskellParser.prototype.testSuite = function () {
        return str("Test suite").skip(optWhitespace).then(this.word).skip(this.colon).skip(optWhitespace).skip(this.running).skip(optWhitespace);
    };

    HaskellParser.prototype.test = function () {
        var _this = this;
        return this.testTitle().then(function (title) {
            return _this.passFail().map(function (pf) {
                return {
                    test: title,
                    status: pf
                };
            });
        });
    };

    HaskellParser.prototype.testTitle = function () {
        var testName = this.testKeyword.skip(optWhitespace).skip(str("TestFixtures")).skip(this.colon).then(this.word);

        var fileName = regex(/^.*\.hs/);

        var fileNameWithNumber = fileName.skip(this.colon).then(function (name) {
            return Parsimmon.digits.map(function (d) {
                return {
                    fileName: name,
                    lineNumber: d
                };
            });
        });

        var sourceFile = optWhitespace.then(this.between(fileNameWithNumber, "(", ")"));

        return testName.then(function (name) {
            return sourceFile.map(function (sourceInfo) {
                return {
                    testName: name,
                    source: sourceInfo
                };
            });
        }).skip(optWhitespace);
    };

    HaskellParser.prototype.time = function () {
        var ms = Parsimmon.digits.skip(str("ms"));

        return optWhitespace.then(this.between(ms, "(", ")")).skip(optWhitespace);
    };

    HaskellParser.prototype.passFail = function () {
        var _this = this;
        var testSuccess = str("+++ OK").then(this.time()).map(function (t) {
            return {
                pass: true,
                time: t
            };
        });

        var testFailure = regex(/^[\s\S]+Failed!/).then(function (rawFailure) {
            return _this.time().map(function (t) {
                return {
                    pass: false,
                    time: t,
                    raw: rawFailure
                };
            });
        });

        return testSuccess.or(testFailure).skip(optWhitespace);
    };
    return HaskellParser;
})();
exports.HaskellParser = HaskellParser;
//# sourceMappingURL=haskell.js.map
