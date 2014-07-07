angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('loginCtrl', ['$scope', 'ajaxService', '$location', function($scope, ajaxService, $location){

        $scope.logar = function(usuario){

            var url = '/api/users/'+usuario.email+'/'+usuario.senha;
            ajaxService.getDataBy(url, function(data){
                if(data !== 'null'){
                    console.log(data);
                    $('#logarModal').modal('hide');
                    location.href="/jogo";
                }else{
                    $scope.erro = 'Usuário ou senha inválido'
                    console.log($scope.erro);
                }
            });
        };
    }]);