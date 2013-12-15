function mainCntrl ($scope, liveLoaderService){

    liveLoaderService.register(function(data){
        $scope.data = data;
    });

    liveLoaderService.start();

    $scope.pass = true;

    $scope.data = "start!";
}