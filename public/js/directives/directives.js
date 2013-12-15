function registerDirectives(app){
    app.directive('testEntry', testDirective);
}

function testDirective(){
    return {
        restrict: 'E',
        scope: {
            test: "="
        },
        templateUrl: 'partials/testEntry.html',
        link: function (scope, element) {

        }
    };
}