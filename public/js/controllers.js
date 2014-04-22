angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('loginCtrl', ['$scope', 'ajaxService', '$location', function($scope, ajaxService, $location){

        $scope.login = function(usuario){
            var url = '/api/users/'+usuario.email+'/'+usuario.password;
            ajaxService.getDataBy(url, function(data){
                if(data !== null){
                   location.href="/jogo";
                }
            });
        };
    }]);