angular.module('tccApp', ['ngRoute', 'ngResource', 'tccApp.controllers', 'ui.bootstrap', 'ui.route'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'angular/play/menu'
            })
    }]);