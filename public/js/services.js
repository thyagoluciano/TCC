angular.module('tccApp.services', ['ngResource'])
    .factory('ajaxService', ['$http', function($http){
        return {
            getDataBy: function(url, callback){
                $http({
                    url: url,
                    method: "GET"
                })
                    .success(function(data){
                        callback(data);
                    });
            }
        }
    }]);;

