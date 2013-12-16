///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/express.d.ts'/>

import CabalRunner = require("../cabalRunner");

export class ServerRoutes{
    constructor(app, config){
        app.get("/cabal-test", (req, res) => {

            var runner = new CabalRunner.CabalRunner(config.projectSource);

            runner.test(() => {
                res.send("OK");
            });
        });
    }
}