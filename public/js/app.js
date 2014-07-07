angular.module('tccApp', ['ngRoute', 'ngResource', 'tccApp.controllers'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
               templateUrl: 'angular/site/home'
            })
            //$locationProvider.html5Mode(true);
    }]);