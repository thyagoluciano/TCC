angular.module('tccApp.services', ['ngResource'])
    .factory('ajaxService', ['$http', function($http){
        return {
            getDataBy: function(url, callback){
                $http({
                    url: url,
                    method: "GET"
                }).success(function(data){callback(data);});
            },
            postData: function(url, data, callback){
                $http({
                    url: url,
                    method: "POST",
                    data: data
                }).success(function(data){callback(data);});
            },
            delete: function(url, callback){
                $http({
                    url: url,
                    method: 'DELETE'
                }).success(function(data){callback(data);});
            },
            setAvatar: function(url){
                $http({
                    url: url,
                    method: "GET"
                }).success(function(){
                        console.log('ok');
                    });
            }

        }
    }]);;

