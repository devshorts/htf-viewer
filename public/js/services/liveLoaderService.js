function registerLiveLoader(app){
    app
        .factory("liveLoaderService", function($rootScope){
            return new LiveLoaderService($rootScope);
        })
        .service("cabalService", CabalService);
}

function LiveLoaderService($rootScope){
    this.allCallbacks = [];

    this.started = false;

    this.register = function(callback){
        this.allCallbacks.push(callback);
    };

    this.unregister = function(callback){
        this.allCallbacks = _.reject(this.allCallbacks, function(c){
            return c == callback;
        });
    };

    function basePath(){
        var pathArray = window.location.href.split( '/' );
        var protocol = pathArray[0];
        var host = pathArray[2];
        return protocol + '//' + host;
    }

    this.start = function(){
        if(this.started){
            return;
        }

        var self = this;

        console.log(basePath());

        var socket = io.connect(basePath());

        socket.on('data', function (data) {
            _.forEach(self.allCallbacks, function(callback){
                callback(data);
            });

            $rootScope.$apply();
        });
    };
}

function CabalService($http){
    this.cabalTest = function(success, error){
        $http.get("/cabal-test").success(success).error(error);
    }
}