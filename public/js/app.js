angular.module('tccApp', ['ngRoute', 'ngResource', 'tccApp.controllers'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
               templateUrl: 'angular/jogo/login'
            })
            .when('/jogo', {
                templateUrl: 'angular/jogo/avatar'
            });
            //$locationProvider.html5Mode(true);
    }]);