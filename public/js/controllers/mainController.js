function mainCntrl ($scope, liveLoaderService){

    liveLoaderService.register(function(data){
        $scope.data = data;
    });

    liveLoaderService.start();

    $scope.pass = true;

    $scope.fixtureSelected = function(fixture){
        console.log("chose " + fixture);
    };

    $scope.sort = "";
    $scope.reverse = false;

    // view all tests
    $scope.testFilterType = undefined;

    $scope.viewType = function(type){
        switch(type){
            case "all": $scope.testFilterType = undefined;break;
            case "pass": $scope.testFilterType = false;break;
            case "fail": $scope.testFilterType = true;break;
        }

        return undefined;
    }
}