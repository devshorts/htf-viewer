
function bootStrap(app){
    initServices(app);
    initConfig(app);
}

function initConfig(app){
    app.config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('main', {
                url: "/",
                templateUrl: "partials/main.html",
                controller: mainCntrl
            });
    });
}

function mainCntrl ($scope){
   $scope.data = "data!";
}