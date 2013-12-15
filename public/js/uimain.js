
function bootStrap(app){
    initServices(app);
    initConfig(app);
    registerDirectives(app);
    initFilters(app);
}

function initConfig(app){
    initRoutes(app);
}

function initRoutes(app){
    app.config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to root
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state('main', {
                url: "/",
                templateUrl: "partials/main.html",
                controller: mainCntrl
            });
    });
}

