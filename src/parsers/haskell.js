///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>
var dto = require("./TestDto");

var _ = require('underscore')._;

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
    return HaskellParser;
})();
exports.HaskellParser = HaskellParser;
//# sourceMappingURL=haskell.js.map
