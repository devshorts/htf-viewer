///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>
var TestDto = (function () {
    function TestDto() {
        this.testName = "";
        this.lineNumber = 0;
        this.stackTrace = "";
        this.pass = false;
    }
    TestDto.prototype.withName = function (name) {
        this.testName = name;
        return this;
    };

    TestDto.prototype.withLineNum = function (number) {
        this.lineNumber = number;
        return this;
    };

    TestDto.prototype.withStack = function (stack) {
        this.stackTrace = stack;
        return this;
    };

    TestDto.prototype.withPass = function (pass) {
        this.pass = pass;
        return this;
    };
    return TestDto;
})();
exports.TestDto = TestDto;

var TestFixtureDto = (function () {
    function TestFixtureDto() {
        this.fixtureName = "";
        this.tests = [];
    }
    return TestFixtureDto;
})();
exports.TestFixtureDto = TestFixtureDto;
//# sourceMappingURL=testDto.js.map
