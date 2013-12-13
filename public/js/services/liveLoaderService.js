function registerLiveLoader(app){
    app.factory("liveLoaderService", function($rootScope){
        return new LiveLoaderService($rootScope);
    })
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

    this.start = function(){
        if(this.started){
            return;
        }

        var self = this;

        var socket = io.connect('http://localhost:3000');

        socket.on('data', function (data) {
            _.forEach(self.allCallbacks, function(callback){
                callback(data);
            });

            $rootScope.$apply();
        });
    };
}