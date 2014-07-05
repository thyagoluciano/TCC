angular.module('tccApp.services', ['ngResource'])
    .factory('CategoriaFactory', function($resource){
        return $resource(
            'http://localhost:3000/api/categoria/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/categoria/:id'
                },
                findById: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/categoria/:id'
                }
            }
        );
    })
    .factory('ProdutoFactory', function($resource){
        return $resource(
            'http://localhost:3000/api/produto/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/produto/:id'
                },
                findById: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/produto/:id'
                }
            }
        );
    })
    .factory('UploadFactory', function($resource){
        return $resource(
            'http://localhost:3000/api/upload/:id', {
                id: '@id'
            },
            {
                findById: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/upload/:id'
                },
                findByType: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/upload/type/:id'
                }
            }

        );
    })
    .factory('MapFactory', function($resource){
        return $resource(
            'http://localhost:3000/api/map/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/map/:id'
                },
                findById: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/map/:id'
                }
            }
        );
    })
    .factory('EnemyFactory', function($resource){
        return $resource(
            'http://localhost:3000/api/enemy/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: 'http://localhost:3000/api/enemy/:id'
                },
                findById: {
                    method: 'GET',
                    url: 'http://localhost:3000/api/enemy/:id'
                }
            }
        );
    })
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

