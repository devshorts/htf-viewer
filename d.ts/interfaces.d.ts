interface IParser{
    parse(contents:String):ITestFixture[];
}

interface ITest{
    testName:string;
    lineNumber:number;
    stackTrace:string;
    pass:boolean;
}

interface ITestFixture{
    fixtureName:string;
    tests:ITest[];
}