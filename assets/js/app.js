var sidekeek = angular.module('sidekeek', [
    'ngRoute',
    'appControllers'
]);

sidekeek.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/home', {
            'templateUrl': 'partials/home.html',
            'controller': 'HomeController'
        }).
        otherwise({
            'redirectTo': '/home'
        });
    }]);