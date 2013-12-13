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

    parseFile(contents:String){
        var file = this.testSuite().then(suite => {
            return this.test().many().map(entries => {
                return {
                    suite: suite,
                    entries: entries
                }
            })
        }).skip(Parsimmon.all);

        return file.parse(contents);
    }


    private between(parser, a, b){
        return str(a).then(parser).skip(str(b));
    }

    private testKeyword = str("[TEST]");

    private running = str("RUNNING...");

    private colon = str(":");

    private word = regex(/^([A-Z]|[a-z]|[0-9]|_)*/);

    testSuite(){
        return str("Test suite")
            .skip(optWhitespace)
            .then(this.word)
            .skip(this.colon)
            .skip(optWhitespace)
            .skip(this.running)
            .skip(optWhitespace);
    }

    test(){
        return this.testTitle().then(title => {
            return this.passFail().map(pf => {
                return {
                    test: title,
                    status: pf
                }
            })
        });
    }

    testTitle(){
        var testName =
            this.testKeyword
                .skip(optWhitespace)
                .skip(str("TestFixtures"))
                .skip(this.colon)
                .then(this.word);

        var fileName = regex(/^.*\.hs/);

        var fileNameWithNumber = fileName.skip(this.colon).then(name => {
            return Parsimmon.digits.map(d => {
                return {
                    fileName: name,
                    lineNumber: d
                }
            });
        });

        var sourceFile = optWhitespace.then(this.between(fileNameWithNumber, "(", ")"));

        return testName.then(name => {
            return sourceFile.map(sourceInfo => {
                return {
                    testName: name,
                    source: sourceInfo
                }
            });
        }).skip(optWhitespace);
    }

    time(){
        var ms = Parsimmon.digits.skip(str("ms"));

        return optWhitespace
            .then(this.between(ms, "(", ")"))
            .skip(optWhitespace);
    }

    passFail(){
        var testSuccess = str("+++ OK").then(this.time()).map(t => {
            return {
                pass: true,
                time: t
            }
        });

        var testFailure = regex(/^[\s\S]+Failed!/).then(rawFailure => {
            return this.time().map(t => {
                return {
                    pass: false,
                    time: t,
                    raw: rawFailure
                }
            })
        });

        return testSuccess.or(testFailure).skip(optWhitespace);
    }

}