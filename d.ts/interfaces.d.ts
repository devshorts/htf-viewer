interface ConfigData{
    projectSource: string;
    port: number;
}

interface IParser{
    parseFile(contents:string):any;
}