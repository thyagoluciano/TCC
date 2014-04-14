angular.module('tccApp', ['ngRoute', 'ngResource', 'tccApp.controllers'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'angular/chat/login'
//                ,controller: 'loginCtrl'
            })
            .when('/chat', {
                templateUrl: 'angular/chat/index'
            });

            //$locationProvider.html5Mode(true);
    }]);