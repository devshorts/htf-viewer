///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/node.d.ts'/>
///<reference path='../../d.ts/vendor/underscore.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>
var fs = require("fs");
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
    HaskellParser.prototype.parseFile = function (path) {
        var contents = fs.readFileSync(path, 'utf8').toString();

        return this.parse(contents);
    };

    HaskellParser.prototype.parse = function (contents) {
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
                title.status = pf;
                return {
                    test: title
                };
            });
        });
    };

    HaskellParser.prototype.testTitle = function () {
        var _this = this;
        var testName = this.testKeyword.skip(optWhitespace).then(this.word).then(function (fixture) {
            return _this.colon.then(_this.word).map(function (name) {
                return {
                    'module': fixture,
                    'testName': name,
                    'status': {}
                };
            });
        });

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
                    info: name,
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
