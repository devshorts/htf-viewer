///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>

export class TestDto implements ITest{
    public testName = "";
    public lineNumber = 0;
    public stackTrace = "";
    public pass = false;

    public withName(name){
        this.testName = name;
        return this;
    }

    public withLineNum(number){
        this.lineNumber = number;
        return this;
    }

    public withStack(stack){
        this.stackTrace = stack;
        return this;
    }

    public withPass(pass:boolean){
        this.pass = pass;
        return this;
    }
}

export class TestFixtureDto implements  ITestFixture{
    public fixtureName:string = "";
    public tests:ITest[] = [];
}