interface INodeUnitTest{
    done(): void;
    ok(isGood:Boolean, message?:string):void;
    equal(expected:any, actual:any, message?:string);
}