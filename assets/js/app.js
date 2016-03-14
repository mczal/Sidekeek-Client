var sidekeekApp = angular.module('sidekeekApp', [
    'appController',
    'ui.bootstrap',
	'ngRoute',
    'ngSanitize'
]);

sidekeekApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/home', {
            'templateUrl': 'partials/home.html',
            'controller': 'HomeController'
        }).
		when('/start-host', {
			'templateUrl' : 'partials/start.html',
			'controller' : 'StartController'
		}).
		when('/next-start', {
			'templateUrl' : 'partials/next-start.html',
			'controller' : 'StartController'
		}).
		when('/sign-up', {
			'templateUrl' : 'partials/sign-up.html',
			'controller' : 'SignUpController'
		}).
        when('/edit-profile', {
			'templateUrl' : 'partials/edit-profile.html',
			'controller' : 'EditProfileController'
		}).
        when('/edit-profile-full', {
			'templateUrl' : 'partials/edit-profile-full.html',
			'controller' : 'EditProfileController'
		}).
        when('/profile', {
            'templateUrl' : 'partials/profile.html',
            'controller' : 'ProfileController'
        }).
        when('/start1', {
            'templateUrl' : 'partials/unamed1.html',
            'controller' : 'StartController'
        }).
        otherwise({
            'redirectTo': '/home'
        });
	}]);
