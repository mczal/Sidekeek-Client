var sidekeekApp = angular.module('sidekeekApp', [
    'appController',
    'ui.bootstrap',
    'ui.bootstrap.tabs',
	'ngRoute',
    'ngAnimate'
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
			'templateUrl' : 'partials/next-start.html',
			'controller' : 'StartController'
		}).
		when('/sign-up', {
			'templateUrl' : 'partials/sign-up.html',
			'controller' : 'StartController'
		}).
        when('/edit-profile', {
			'templateUrl' : 'partials/edit-profile.html',
			'controller' : 'StartController'
		}).
        when('/edit-profile-full', {
			'templateUrl' : 'partials/edit-profile-full.html',
			'controller' : 'StartController'
		})
        // otherwise({
        //     'redirectTo': '/home'
        // });
	}]);
