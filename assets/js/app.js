var sidekeekApp = angular.module('sidekeekApp', [
    'appController',
	'ngRoute'
]);

sidekeekApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/home', {
            'templateUrl': 'partials/home.html',
            'controller': 'HomeController'
        }).
		when('/start', {
			'templateUrl' : 'partials/start.html',
			'controller' : 'StartController'
		}).
		when('/next-start', {
			'templateUrl' : 'partials/start1.html',
			'controller' : 'StartController'
		}).
		when('/sign-up', {
			'templateUrl' : 'partials/start2.html',
			'controller' : 'StartController'
		}).
        otherwise({
            'redirectTo': '/home'
        });
	}]);