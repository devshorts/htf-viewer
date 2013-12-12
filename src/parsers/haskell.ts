///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/node.d.ts'/>
///<reference path='../../d.ts/vendor/underscore.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>

import dto = require("./testDto");

var _ = require('underscore')._;

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
}