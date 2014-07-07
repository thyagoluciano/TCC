angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('playCtrl', ['$scope', 'ajaxService', '$location', '$modal', function($scope, ajaxService, $location, $modal){
        $scope.nome = 'Thyago';

        $scope.logout = function(){
            ajaxService.setAvatar('/api/logout');
            location.href="/";
        }

        console.log($scope.nome);
    }])
    .controller('chatCtrl', ['$scope', function($scope){
        $scope.chat = [];

        // Recebe o nome do avatar;
        GameCtrl.socket.on('avatar:init', function(data){
            $scope.avatarName = data.name;
            $scope.avatarRoom = data.room;

            console.log(data);
        });

        GameCtrl.socket.on('chat:recebeMensagem', function(data){
            $scope.chat.unshift({name: data.name, msg: data.msg, data: new Date()});
            $scope.$apply();
        });

        $scope.enviarMensagem = function(chat){
            // Envia Mensagem para o Servidor
            GameCtrl.socket.emit('chat:enviaMensagem', {room: $scope.avatarRoom, name: $scope.avatarName, msg: chat.msg});

            $scope.chat.unshift({name: $scope.avatarName, msg: chat.msg, data: new Date()});
        }

        $scope.teste = function(){
            //socket.emit('teste', { msg: 'Enviando um socket de fora do game'});
            GameCtrl.socket.emit('teste', { msg: 'Enviando um socket de fora do game'});

            GameCtrl.socket.on('testeRecebe', function(data){
                console.log(data.id, data.msg);
            });
        }
    }])
    .controller('lojaCtrl', ['$scope', 'ProdutoFactory', function($scope, ProdutoFactory){
        $scope.intensCarrinho = false;
        $scope.carrinho = [];

        $scope.produtos = [];

        ProdutoFactory.query(
            {},
            function(data, status, headers, config){
                for(var i = 0; i < data.length; i ++){
                    data[i].thumbs = {
                        x: Math.floor( data[i].tiledPosition * 34 ),
                        y: Math.floor( data[i].tiledPosition / 14 ) * 34
                    }
                }

                $scope.produtos = data;

                console.log($scope.produtos);
            },
            function(data , status, headers, config){
                alert('Ocorreu um erro: ' + data);
            }
        );


        $scope.addCarrinho = function(produto){
            $scope.intensCarrinho = true;
            $scope.carrinho.unshift(produto);
            $scope.calculaCompra();
        }

        $scope.calculaCompra = function(){
            $scope.qtd = $scope.carrinho.length;
            var total = 0;

            angular.forEach($scope.carrinho, function(value, key){
                var valor = value.price.real.replace(/,/gi, ".");
                    valor = parseFloat(valor);

                total += valor;
            });

            $scope.total = total.toFixed(2);

            console.log($scope.total);
        }
    }]);