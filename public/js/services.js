
function initServices(app){
    app.factory('dataRender', function($http) {
        return {
            getFoos: function() {
                //return the promise directly.
                return $http.get('/data')
                    .then(function(result) {
                        //resolve the promise as the data
                        return result.data;
                    });
            }
        }
    });
};