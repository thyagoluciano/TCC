angular.module('tccApp', ['ngRoute', 'ngResource', 'tccApp.controllers'])

.config(['$routeProvider', '$locationProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/angular/admin/dashboard'
            })

            // Categorias
            .when('/loja/categoria', {
                templateUrl: '/angular/admin/loja/categorias',
                controller: 'adminCategoriasController'
            })
            .when('/loja/categoria/novo', {
                templateUrl: '/angular/admin/loja/frmCategorias',
                controller: 'adminCategoriasController'
            })
            .when('/loja/categoria/editar/:id', {
                templateUrl: '/angular/admin/loja/frmCategorias',
                controller: 'adminCategoriasController'
            })

            // Produtos
            .when('/loja/produto', {
                templateUrl: '/angular/admin/loja/produtos',
                controller: 'adminProdutosController'
            })
            .when('/loja/produto/novo', {
                templateUrl: '/angular/admin/loja/frmProdutos',
                controller: 'adminProdutosController'
            })
            .when('/loja/produto/editar/:id', {
                templateUrl: '/angular/admin/loja/frmProdutos',
                controller: 'adminProdutosController'
            })
            // GAME
            .when('/game', {
                templateUrl: '/angular/admin/game/categorias',
                controller: 'adminGameCtrl'
            })
            .when('/game/tileset', {
                templateUrl: '/angular/admin/game/tileset',
                controller: 'adminGameCtrl'
            })
            .when('/game/tileset/novo', {
                templateUrl: '/angular/admin/game/frmTileset',
                controller: 'adminGameCtrl'
            })

            // GAME MAPA
            .when('/game/mapa', {
                templateUrl: '/angular/admin/game/mapas',
                controller: 'mapGameController'
            })
            .when('/game/mapa/novo', {
                templateUrl: '/angular/admin/game/frmMapas',
                controller: 'mapGameController'
            })
            .when('/game/mapa/editar/:id', {
                templateUrl: '/angular/admin/game/frmMapas',
                controller: 'mapGameController'
            })

            // GAME MAPA
            .when('/game/inimigo', {
                templateUrl: '/angular/admin/game/inimigo',
                controller: 'enemyGameController'
            })
            .when('/game/inimigo/novo', {
                templateUrl: '/angular/admin/game/frmInimigo',
                controller: 'enemyGameController'
            })
            .when('/game/inimigo/editar/:id', {
                templateUrl: '/angular/admin/game/frmInimigo',
                controller: 'enemyGameController'
            })
            //$locationProvider.html5Mode(true);
    }]);

