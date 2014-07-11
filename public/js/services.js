angular.module('tccApp.services', ['ngResource'])
    .factory('UsuarioFactory', function($resource){
        return $resource(
            '/api/users/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/users/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/users/:id'
                }
            }
        );
    })
    .factory('CategoriaFactory', function($resource){
        return $resource(
            '/api/categoria/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/categoria/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/categoria/:id'
                }
            }
        );
    })
    .factory('ProdutoFactory', function($resource){
        return $resource(
            '/api/produto/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/produto/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/produto/:id'
                }
            }
        );
    })
    .factory('PedidoFactory', function($resource){
        return $resource(
            '/api/pedido/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/pedido/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/pedido/:id'
                }
            }
        );
    })
    .factory('AvatarFactory', function($resource){
        return $resource(
            '/api/avatar/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/avatar/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/avatar/:id'
                }
            }
        );
    })
    .factory('UploadFactory', function($resource){
        return $resource(
            '/api/upload/:id', {
                id: '@id'
            },
            {
                findById: {
                    method: 'GET',
                    url: '/api/upload/:id'
                },
                findByType: {
                    method: 'GET',
                    url: '/api/upload/type/:id'
                }
            }

        );
    })
    .factory('MapFactory', function($resource){
        return $resource(
            '/api/map/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/map/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/map/:id'
                }
            }
        );
    })
    .factory('EnemyFactory', function($resource){
        return $resource(
            '/api/enemy/:id', {
                id: '@id'
            },
            {
                update: {
                    method: 'PUT',
                    url: '/api/enemy/:id'
                },
                findById: {
                    method: 'GET',
                    url: '/api/enemy/:id'
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
    }])
    .factory('globalService', function($resource){
        var objSrv = {}

        return {
            objSrv: objSrv
        }
    });

