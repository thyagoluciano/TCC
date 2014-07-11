angular.module('tccApp.controllers', ['tccApp.services', 'angularFileUpload'])
    .controller('adminCtrl', ['$scope', 'ajaxService', function($scope, ajaxService){

        // Logar o Usuário no Painel Administrativo
        $scope.logar = function(usuario){


           if(usuario){
               var url = '/api/users/'+usuario.username+'/'+usuario.password;

               ajaxService.getDataBy(url, function(data){

                   if(data !== null){

                       if(data.perfil.perfil === 'Administrador'){
                           location.href="/admin/manager";
                       }else{
                           $scope.logout();
                       }

                   }else{
                       console.log('Usuário ou Senha Inválido!');
                   }
               });
           }else{
               console.log('invalido: ' + usuario);
           }
        }

        // Deslogar Usuário do Painel Administrativo
        $scope.logout = function(){
            var url = '/api/users/logout';

            ajaxService.getDataBy(url, function(data){
                if(data !== null){
                    location.href="/admin";
                }
            });
        }

    }])
    .controller('adminCategoriasController', ['$scope', 'CategoriaFactory','ajaxService', '$routeParams', '$location',function($scope, CategoriaFactory, ajaxService, $routeParams, $location){

        $scope.load = function(){
            $scope.categorias = CategoriaFactory.query();
        };

        /**
         * Adiciona ou Atualiza uma Categoria
         * @param categoria
         */
        $scope.adicionar = function(categoria){
            if(categoria){
                if(categoria._id){

                    var _id = categoria._id;

                    delete categoria._id;

                    $scope.result = CategoriaFactory.update(
                        {id: _id},
                        categoria,
                        function(data, status, headers, config){
                            alert('Categoria Atualizada com Sucesso!');
                            $location.path('/loja/categoria');
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    );

                }else{
                    $scope.result = CategoriaFactory.save(
                        {},
                        categoria,
                        function(data, status, headers, config){
                            alert('Categoria Cadastrada com Sucesso!');
                            $location.path('/loja/categoria');
                        },
                        function(data , status, headers, config){
                            alert('Ocorreu um erro: ' + data.messages[0]);
                        }
                    );
                }
            }
        }

        $scope.excluir = function(id){
            if(confirm('Deseja realmente excluir esta pessoa?')){
                CategoriaFactory.remove(
                    {id: id},
                    {},
                    function(data, status, headers, config){
                        $scope.load();
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }else{
                $scope.load();
            }
        }

        $scope.get = function(){
            var _id = $routeParams.id

            if(_id){
                CategoriaFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
                            $scope.categoria = data;
                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        };

        $scope.cancelar = function(){
            $scope.categoria = {};
            $location.path('/loja/categoria');
        }
    }])
    .controller('adminProdutosController', ['$scope', 'ProdutoFactory', 'CategoriaFactory', 'UploadFactory', 'ajaxService', '$routeParams', '$location', function($scope, ProdutoFactory, CategoriaFactory, UploadFactory, ajaxService, $routeParams, $location){

        $scope.produto = {};
        $scope.produto.equipAttr = {
            atk: 0,
            def: 0,
            hp: 0,
            str: 0,
            str: 0,
            agi: 0,
            vit: 0,
            int: 0,
            dex: 0,
            luk: 0
        }

        $scope.equips = false;
        $scope.imgTile = false;

        var url = '/api/upload/type/sprite';
        ajaxService.getDataBy(url, function(data){
            if(data !== null){
                $scope.tileds = data;
            }
        });

        $scope.buscaAtlas = [];
        $scope.buscaSprite = [];

        UploadFactory.query(
            {},
            {},
            function(data, status, headers, config){
                for(var i = 0; i < data.length; i++){
                    if(data[i].type == 'atlas'){
                        $scope.buscaAtlas.push(data[i]);
                    }else{
                        $scope.buscaSprite.push(data[i]);
                    }
                }
            },
            function(data , status, headers, config){
                alert('Ocorreu um erro: ' + data);
            }
        );

        $scope.$watch('produto.categoria', function(newVal) {
            if(newVal){
                if (newVal.name == 'equip') {
                    $scope.equips = true;
                }else{
                    $scope.equips = false;
                }
            }
        });


        $scope.$watch('produto.tiled', function(newVal) {
            if (newVal) {
                $scope.imgTile = true;
            }else{
                $scope.imgTile = false;
            }
        });

        $scope.load = function(){

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
                },
                function(data , status, headers, config){
                    alert('Ocorreu um erro: ' + data);
                }
            );
        };

        $scope.get = function(){
            $scope.categorias = CategoriaFactory.query();

            var _id = $routeParams.id

            if(_id){
                ProdutoFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
                           $scope.produto = {
                               _id: data._id,
                               name: data.name,
                               categoria: data.type,
                               tiled: data.tiled,
                               tiledPosition: data.tiledPosition,
                               price: data.price,
                               equipAttr: data.equipAttr,
                               description: data.description
                           }
                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        }

        /**
         * Adicionar Tileset
         * @param tiled
         */
        $scope.adicionar = function(produto){

            if(produto){
                if(produto._id){
                    var _id = produto._id;

                    delete produto._id;

                    ProdutoFactory.update(
                        {id: _id},
                        produto,
                        function(data, status, headers, config){
                            alert('Produto atualizado com sucesso!');
                            $location.path('/loja/produto');
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    );

                }else{
                    ProdutoFactory.save(
                        {},
                        produto,
                        function(data, status, headers, config){
                            alert('Produto Cadastrada com Sucesso!');
                            $location.path('/loja/produto');
                        },
                        function(data , status, headers, config){
                            console.log('Ocorreu um erro: ', data);
                        }
                    );
                }
            }
        }

        /**
         * Excluir Item
         * @param id
         */
        $scope.excluir = function(id){
            if(confirm('Deseja realmente excluir este Item?')){
                ProdutoFactory.remove(
                    {id: id},
                    {},
                    function(data, status, headers, config){
                        $scope.load();
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }else{
                $scope.load();
            }
        }

        $scope.cancelar = function(){
            $scope.produto = {};
            $location.path('/loja/produto');
        }
    }])
    .controller('adminPedidosController', ['$scope', 'PedidoFactory', 'AvatarFactory', '$routeParams', '$location', function($scope, PedidoFactory, AvatarFactory, $routeParams, $location){

        $scope.showPagar = true;

        $scope.load = function(){
            PedidoFactory.query(
                {},
                function(data, status, headers, config){
                    $scope.pedidos = data;
                },
                function(data , status, headers, config){
                    alert('Ocorreu um erro: ' + data);
                }
            );
        };

        $scope.get = function(){

            var _id = $routeParams.id

            if(_id){
                PedidoFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
                            var dt = new Date(Date.parse(data.pagseguro.checkout.date[0]));
                            data.dataPedido = dt.toLocaleDateString();
                            data.itens = $scope.calculaCompra(data.itens);

                            $scope.itens = data.itens;
                            $scope.pedido = data;

                            if(data.status === "Finalizado"){
                                $scope.showPagar = false;
                            }

                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        }

        $scope.pagar = function(pedido){
            // Atualizar o pedido para finalizado.

            if(pedido){
                pedido.status = 'Finalizado'
                if(pedido._id){
                    var _id = pedido._id;

                    delete pedido._id;

                    PedidoFactory.update(
                        {id: _id},
                        pedido,
                        function(data, status, headers, config){
                            alert('Produto atualizado com sucesso!');
                            $scope.showPagar = false;
                            $location.path('/loja/pedidos/visualizar/'+_id);
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    );

                }else{
                    PedidoFactory.save(
                        {},
                        pedido,
                        function(data, status, headers, config){
                            alert('Produto Cadastrada com Sucesso!');
                            $location.path('/loja/pedidos');
                        },
                        function(data , status, headers, config){
                            console.log('Ocorreu um erro: ', data);
                        }
                    );
                }
            }
            // Pegar os itens do pedido e enviar para o storage do jogador
            AvatarFactory.findById(
                {id: pedido.user.avatar._id},
                function(data, status, headers, config){
                    if(data !== null){
                        if(data.storage){
                            for(var i = 0; i < pedido.itens.length; i++){
                                data.storage.push(pedido.itens[i]);
                            }
                        }else{
                            data.storage = pedido.itens;
                        }
                    }

                    var avatarId = data._id;

                    delete data._id;

                    AvatarFactory.update(
                        {id: avatarId},
                        data,
                        function(data, status, headers, config){
                            console.log(data);
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    )
                },
                function(data , status, headers, config){
                    alert('Ocorreu um erro: ' + data);
                }
            );
        }

        $scope.calculaCompra = function(itens){

            var newItens = [];

            $scope.total = 0;

            angular.forEach(itens, function(value, key){
                var valor = value.price.real.replace(/,/gi, ".");
                    valor = parseFloat(valor);

                value.price.real = valor.toFixed(2);
                var total = valor * value.qtd;
                value.total = total.toFixed(2);

                $scope.total += total;

                newItens.push(value);
            });

            $scope.total = $scope.total.toFixed(2);
            return newItens;
        };

    }])
    .controller('adminGameCtrl', ['$scope', 'UploadFactory', '$location', '$upload', function($scope, UploadFactory, $location, $upload){
        $scope.game = 'GAME MMPRPG';
        $scope.tile = {};
        $scope.showImg = false;
        $scope.showBoxImg = false;

        $scope.$watch('tile.type', function(newVal) {
            if (newVal) {
                if(newVal === 'sprite'){
                    $scope.showBoxImg = true;

                }else{
                    $scope.showBoxImg = false;
                }
            }
        });

        $scope.load = function(){
            UploadFactory.query(
                {},
                function(data, status, headers, config){
                    $scope.tiled = [];

                    for(var i = 0; i < data.length; i++){

                        console.log(data[i].type);

                        if(data[i].type == 'sprite'){
                            data[i].img = true;
                        }else{
                            data[i].img = false;
                        }
                        $scope.tiled.push(data[i]);
                    }
                },
                function(data , status, headers, config){
                    alert('Ocorreu um erro: ' + data);
                }
            );
        };

        $scope.get = function(){
            var _id = $routeParams.id

            if(_id){
                UploadFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
                            $scope.categoria = data;
                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        };

        $scope.onFileSelect = function($files, tipo) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/api/uploadFile', //upload.php script, node.js route, or servlet url
                    // method: 'POST' or 'PUT',
                    // headers: {'header-key': 'header-value'},
                    // withCredentials: true,
                    data: {myObj: $scope.myModelObj},
                    file: file // or list of files: $files for html5 only
                    /* set the file formData name ('Content-Desposition'). Default is 'file' */
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        // file is uploaded successfully
                        $scope.tile.file = data.name;
                        if($scope.showBoxImg){
                            $scope.showImg = true;
                        }
                    });
                //.error(...)
                //.then(success, error, progress);
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
        }

        /**
         * Adicionar Tileset
         * @param tiled
         */
        $scope.adicionar = function(tiled){

            if(tiled){
                $scope.result = UploadFactory.save(
                    {},
                    tiled,
                    function(data, status, headers, config){
                        alert('Tiled Cadastrada com Sucesso!');
                        $location.path('/game/tileset');
                    },
                    function(data , status, headers, config){
                        console.log('Ocorreu um erro: ', data);
                    }
                );
            }
        }

        $scope.excluir = function(id){
            if(confirm('Deseja realmente excluir esta Tiled?')){
                UploadFactory.remove(
                    {id: id},
                    {},
                    function(data, status, headers, config){
                        $scope.load();
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }else{
                $scope.load();
            }
        }

        $scope.cancelar = function(){
            $scope.categoria = {};
            $location.path('/game/tileset');
        }
    }])
    .controller('mapGameController', [ '$scope', 'MapFactory', 'UploadFactory', 'ajaxService', '$location', '$routeParams', function($scope, MapFactory, UploadFactory, ajaxService, $location, $routeParams){

        $scope.imgTile = false;
        $scope.buscaAtlas = [];
        $scope.buscaSprite = [];
        $scope.layers = [{name: 'layer_0', value: ''}];
        $scope.enemies = [{name: 'enemy_0', xValue: '', yValue: ''}];

        UploadFactory.query(
            {},
            {},
            function(data, status, headers, config){
                for(var i = 0; i < data.length; i++){
                    if(data[i].type == 'atlas'){
                        $scope.buscaAtlas.push(data[i]);
                    }else{
                        $scope.buscaSprite.push(data[i]);
                    }
                }
            },
            function(data , status, headers, config){
                alert('Ocorreu um erro: ' + data);
            }
        );

        $scope.$watch('mapa.tilesheet', function(newVal) {
            if (newVal) {
                $scope.imgTile = true;
            }else{
                $scope.imgTile = false;
            }
        });

        $scope.load = function(){

            $scope.map = MapFactory.query();
        };

        $scope.get = function(){
            var _id = $routeParams.id

            if(_id){
                MapFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
//                            $scope.mapa = data;
                            console.log(data);
                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        }

        $scope.addLayer = function(){
            $scope.layers.push({name: 'layer_' + $scope.layers.length, value: ''});
        }

        $scope.addEnemy = function(){
            $scope.enemies.push({name: 'layer_' + $scope.layers.length, value: ''});
        }

        $scope.adicionar = function(mapa){
            mapa.layers     = [];
            mapa.enemies    = [];

            angular.forEach($scope.layers, function(data){
                mapa.layers.push({name: data.value});
            });

            angular.forEach($scope.enemies, function(data){
                mapa.enemies.push({x: data.xValue, y: data.yValue});
            });

            if(mapa){
                if(mapa._id){
                    var _id = mapa._id;

                    delete mapa._id;

                    MapFactory.update(
                        {id: _id},
                        mapa,
                        function(data, status, headers, config){
                            alert('Mapa atualizado com sucesso!');
                            $location.path('/game/mapa');
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    );

                }else{
                    MapFactory.save(
                        {},
                        mapa,
                        function(data, status, headers, config){
                            alert('Mapa Cadastrada com Sucesso!');
                            $location.path('/game/mapa');
                        },
                        function(data , status, headers, config){
                            console.log('Ocorreu um erro: ', data);
                        }
                    );
                }
            }
        }

        $scope.cancelar = function(){
            $scope.map = {};
            $location.path('/game/mapa');
        }
    }])
    .controller('enemyGameController', [ '$scope', 'EnemyFactory', 'MapFactory', 'UploadFactory' ,'$location', '$routeParams', function($scope, EnemyFactory, MapFactory, UploadFactory, $location, $routeParams){
        $scope.imgTile = false;
        $scope.buscaAtlas = [];
        $scope.buscaSprite = [];

        $scope.enemy = {};
        $scope.enemy.attributes = {
            str: 0,
            str: 0,
            agi: 0,
            vit: 0,
            int: 0,
            dex: 0,
            luk: 0,
            level: 0
        }

        UploadFactory.query(
            {},
            {},
            function(data, status, headers, config){
                for(var i = 0; i < data.length; i++){
                    if(data[i].type == 'atlas'){
                        $scope.buscaAtlas.push(data[i]);
                    }else{
                        $scope.buscaSprite.push(data[i]);
                    }
                }
            },
            function(data , status, headers, config){
                alert('Ocorreu um erro: ' + data);
            }
        );

        $scope.$watch('enemy.tilesheet', function(newVal) {
            if (newVal) {
                $scope.imgTile = true;
            }else{
                $scope.imgTile = false;
            }
        });


        // Carrega as Rooms
        $scope.rooms = MapFactory.query();


        $scope.get = function(){
            var _id = $routeParams.id

            if(_id){
                EnemyFactory.findById(
                    {id: _id},
                    function(data, status, headers, config){
                        if(data !== null){
//                            $scope.mapa = data;
                            console.log(data);
                        }
                    },
                    function(data , status, headers, config){
                        alert('Ocorreu um erro: ' + data);
                    }
                );
            }
        }


        $scope.adicionar = function(enemy){

            if(enemy){
                if(enemy._id){
                    var _id = enemy._id;

                    delete enemy._id;

                    EnemyFactory.update(
                        {id: _id},
                        enemy,
                        function(data, status, headers, config){
                            alert('Mapa atualizado com sucesso!');
                            $location.path('/game/inimigo');
                        },
                        function(data , status, headers, config){
                            console.log('Erro');
                            console.log(data);
                        }
                    );

                }else{
                    EnemyFactory.save(
                        {},
                        enemy,
                        function(data, status, headers, config){
                            alert('Mapa Cadastrada com Sucesso!');
                            $location.path('/game/inimigo');
                        },
                        function(data , status, headers, config){
                            console.log('Ocorreu um erro: ', data);
                        }
                    );
                }
            }
        }


        /**
         * Load Enemies
         */
        $scope.load = function(){
            $scope.enemy = EnemyFactory.query();
        };

        /**
         * Cancelar
         */
        $scope.cancelar = function(){
            $scope.enemy = {};
            $location.path('/game/inimigo');
        };
    }]);