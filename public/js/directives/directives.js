function registerDirectives(app){
    app.directive('testEntry', testDirective);
    app.directive('mainNav', mainNav);
}

function testDirective(){
    return {
        restrict: 'E',
        scope: {
            test: "="
        },
        templateUrl: 'partials/testEntry.html',
        link: function (scope, element) {
            scope.bgColor = scope.test.status.pass ? "black" : "red";

            scope.showError = false;
        }
    };
}

function mainNav(){
    return {
        restrict: 'E',
        scope: {
            fixtures: "=",
            onSelected: "=",
            viewTestType: "=",
            suite: "=",
            search: "="
        },
        transclude:true,
        templateUrl: 'partials/mainNav.html',
        link: function(scope, element){
            scope.selectFixture = function(fixture){
                scope.onSelected(fixture);

                scope.selectedFixture = fixture;
            };

            scope.viewing = "All";

            scope.viewType = function(type){
                scope.viewTestType(type);

                scope.viewing = function(){
                    switch(type){
                        case "all": return "All";
                        case "fail": return "Passing";
                        case "pass": return "Failing";
                    }
                    return "unknown";
                }();
            }
        }
    }
}

