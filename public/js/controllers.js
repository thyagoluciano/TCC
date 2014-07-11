angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('loginCtrl', ['$scope', 'UsuarioFactory', 'ajaxService', '$location', function($scope, UsuarioFactory, ajaxService, $location){

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

        $scope.cadastrar = function(usuario){
            UsuarioFactory.save(
                {},
                usuario,
                function(data, status, headers, config){
                    alert('Usuario Cadastrado com Sucesso!');
                    $('#CadastrarModal').modal('hide');
                    $('#logarModal').modal('show');
                },
                function(data , status, headers, config){
                    console.log('Ocorreu um erro: ', data);
                }
            );
        }
    }]);