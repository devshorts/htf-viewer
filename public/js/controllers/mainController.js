function mainCntrl ($scope, liveLoaderService){

    liveLoaderService.register(function(data){
        $scope.rawData = data;

        $scope.data = $.extend({}, $scope.rawData);

        $scope.fixtures = _.keys(_.groupBy($scope.rawData.entries, function(item){
            return item.test.info.module;
        }));
    });

    liveLoaderService.start();

    $scope.pass = true;

    $scope.fixtureSelected = function(fixture){
        if(_.isUndefined(fixture)){
            $scope.data = $.extend({}, $scope.rawData);

            return;
        }

        $scope.data.entries = _.filter($scope.rawData.entries, function(entry){
            return entry.test.info.module == fixture;
        });
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