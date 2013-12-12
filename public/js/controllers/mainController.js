function mainCntrl ($scope, liveLoaderService){

    liveLoaderService.register(function(data){
        $scope.data = data;
    });

    liveLoaderService.start();

    $scope.data = "start!";
}