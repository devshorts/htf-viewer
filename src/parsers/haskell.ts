///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/node.d.ts'/>
///<reference path='../../d.ts/vendor/underscore.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>


import dto = require("./testDto");

var _ = require('underscore')._;
var Parsimmon:any = require('parsimmon');

var regex:any = Parsimmon.regex;
var str:any = Parsimmon.string;
var optWhitespace:any = Parsimmon.optWhitespace;

export class HaskellParser implements IParser {
    parse(contents:String):ITestFixture[]{
        var testFixture = new dto.TestFixtureDto();

        testFixture.fixtureName = "test";
        testFixture.tests = _.range( Math.floor((Math.random()*100)+1)).map(i =>
            new dto.TestDto()
                .withLineNum(Math.random())
                .withName(Math.random().toString())
        );

        return [testFixture];
    }

    parseReal(contents:String){
        var id = i => i;

        var testKeyword = str("[TEST]");

        var between = (parser, a, b) => str(a).then(parser).skip(str(b)).map(result => {
            return result;
        });

        var haskellSuffix = str(".hs");
        var running = str("RUNNING...");
        var colon = str(":");

        var word = regex(/^([A-Z]|[a-z]|[0-9]|_)*/);

        var testSuite =
            str("Test suite")
                .skip(optWhitespace)
                .then(word)
                .skip(colon)
                .skip(optWhitespace)
                .skip(running)
                .skip(optWhitespace)
                .map(id);

        var testName =
            testKeyword
                .skip(optWhitespace)
                .skip(str("TestFixtures"))
                .skip(colon)
                .then(word)
                .map(id);

        var fileName = regex(/^.*\.hs/).map(id);

        var fileNameWithNumber = fileName.skip(colon).then(name => {
            return Parsimmon.digits.map(d => {
                return {
                    fileName: name,
                    lineNumber: d
                }
            });
        });

        var sourceFile = optWhitespace.then(between(fileNameWithNumber, "(", ")"));

        var testTitle = testName.then(name => {
            return sourceFile.map(sourceInfo => {
                return {
                    testName: name,
                    source: sourceInfo
                }
            });
        }).skip(optWhitespace);

        var ms = Parsimmon.digits.skip(str("ms"));

        var time = optWhitespace
            .then(between(ms, "(", ")"))
            .skip(optWhitespace);

        var testSuccess = str("+++ OK").then(time).map(t => {
            return {
                pass: true,
                time: t
            }
        });

        var testFailure = regex(/^[\s\S]+Failed!/).then(rawFailure => {
            return time.map(t => {
                return {
                    pass: false,
                    time: t,
                    raw: rawFailure
                }
            })
        });

        var passFail = testSuccess.or(testFailure).skip(optWhitespace);

        var test = testTitle.then(title => {
            return passFail.map(pf => {
                return {
                    test: title,
                    pass: pf
                }
            })
        });

        var file = testSuite.then(suite => {
            return test.many().map(entries => {
                return {
                    suite: suite,
                    entries: entries
                }
            })
        }).skip(Parsimmon.all);

        return file.parse(contents);
    }
}