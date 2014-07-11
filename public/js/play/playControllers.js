angular.module('tccApp.controllers', ['tccApp.services'])
    .controller('playCtrl', ['$scope', 'ajaxService', '$location', '$modal', function($scope, ajaxService, $location, $modal){
        $scope.nome = 'Thyago';

        $scope.logout = function(){
            ajaxService.setAvatar('/api/logout');
            location.href="/";
        }

//        console.log($scope.nome);
    }])
    .controller('chatCtrl', ['$scope', 'globalService', function($scope, globalService){
        $scope.chat = [];

        // Recebe o nome do avatar;
        GameCtrl.socket.on('avatar:init', function(data){
            $scope.avatarName = data.name;
            $scope.avatarRoom = data.room;

            globalService.objSrv.avatarName = $scope.avatarName;

//            console.log(data);
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

    .controller('storageCtrl', ['$scope', '$location', 'AvatarFactory', 'ProdutoFactory', 'ajaxService', 'globalService', function($scope, $location, AvatarFactory, ProdutoFactory, ajaxService, globalService){


        $scope.usar = function(item){
            item.qtd = item.qtd - 1;

            if(item.qtd === 0){
                $scope.itens.splice($scope.itens.indexOf(item), 1);
            };

            var tmpData = $scope.tmpAvatar;

            delete(tmpData._id);

            AvatarFactory.update(
                {id: $scope.n_id},
                tmpData,
                function(data, status, headers, config){
                    console.log(data);
                },
                function(data , status, headers, config){
                    console.log('Erro');
                    console.log(data);
                }
            )

            GameCtrl.socket.emit('item:use', {itemId: item.tiledPosition});
        }

        GameCtrl.socket.on('item:storage', function(data){

            var url = '/api/produto/findBy/' + data.itemId;

            ajaxService.getDataBy(url, function(ret){

                ret.thumbs = {
                    x: Math.floor( ret.tiledPosition * 34 ),
                    y: Math.floor( ret.tiledPosition / 14 ) * 34
                }

                ret.qtd = 1;

                $scope.itens.push(ret);


                var tmpData = $scope.tmpAvatar;


                delete(tmpData._id);

                AvatarFactory.update(
                    {id: $scope.n_id},
                    tmpData,
                    function(data, status, headers, config){
                        console.log(data);
                    },
                    function(data , status, headers, config){
                        console.log('Erro');
                        console.log(data);
                    }
                )

            });
        });

        // Recebe o nome do avatar;
        GameCtrl.socket.on('avatar:init', function(data){
            $scope.avatarName = data.name;
            $scope.avatarRoom = data.room;

            var url = "/api/avatarbyName/" + data.name;

            ajaxService.getDataBy(url, function(ret){

                console.log(ret.storage);


                if(ret.storage){
                    var data = ret.storage;

                    for(var i = 0; i < data.length; i ++){
                        data[i].thumbs = {
                            x: Math.floor( data[i].tiledPosition * 34 ),
                            y: Math.floor( data[i].tiledPosition / 14 ) * 34
                        }
                    }

                    $scope.itens = data;

                    $scope.tmpAvatar = ret;
                    $scope.n_id = ret._id;
                }

//                console.log($scope.itens);
            })

        });

    }])
    .controller('lojaCtrl', ['$scope', '$location', 'ProdutoFactory', 'ajaxService', 'globalService', function($scope, $location, ProdutoFactory, ajaxService, globalService){
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

//                console.log($scope.produtos);
            },
            function(data , status, headers, config){
                alert('Ocorreu um erro: ' + data);
            }
        );


        $scope.addCarrinho = function(produto){

            if($scope.findByHashKey(produto.$$hashKey)){
                produto.qtd += 1;
            }else{
//                console.log('FALSE');
                produto.qtd = 1;
                $scope.carrinho.push(produto);
            }

            $scope.intensCarrinho = true;
            $scope.calculaCompra();

        };

        $scope.finalizar = function(){
            var url = '/api/pagar';

//            globalService.objSrv.avatarName

            var dados = {
                comprador: globalService.objSrv.avatarName,
                carrinho: $scope.carrinho
            }


            ajaxService.postData(url, dados, function(ret){


                console.log(ret);

                $('#carrModal').modal('toggle');

                $scope.intensCarrinho = false;
                $scope.carrinho = [];
                $scope.qtd = 0;
                $scope.total = 0;

//                $location.path('https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + ret.checkout.code[0]);
//                res.redirect('https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result.checkout.code[0]);
//                location.href = "https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + ret.checkout.code[0];
                window.open("https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + ret.checkout.code[0], '_blank');
            })
        };

        $scope.calculaCompra = function(){
            $scope.qtd = $scope.carrinho.length;
            var total = 0;

            angular.forEach($scope.carrinho, function(value, key){
                var valor = value.price.real.replace(/,/gi, ".");
                    valor = parseFloat(valor);

                total += (valor * value.qtd);
            });

            $scope.total = total.toFixed(2);

//            console.log($scope.total);
        };

        $scope.removeItem = function(value){
            $scope.carrinho.splice($scope.carrinho.indexOf(value), 1);
        };

        $scope.findByHashKey = function(hashkey){
            for(var i = 0; i < $scope.carrinho.length; i++){
                if($scope.carrinho[i].$$hashKey === hashkey){
                    return true;
                }
            }
            return false;
        }
    }]);