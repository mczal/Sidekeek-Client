var sidekeekApp = angular.module('sidekeekApp', [
    'appControllers',
    'ui.bootstrap',
	'ngRoute',
    'ngSanitize',
    'naif.base64',
    'angular-img-cropper'
]);

sidekeekApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/home', {
            'templateUrl': 'partials/home.html',
            'controller': 'HomeController'
        }).
		when('/start-host', {
			'templateUrl' : 'partials/start-host.html',
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
        when('/login', {
          'templateUrl' : 'partials/login.html',
          'controller' : 'LogInController'
        }).
        when('/edit-profile-host', {
			'templateUrl' : 'partials/edit-profile-host.html',
			'controller' : 'EditProfileController'
		}).
        when('/edit-profile', {
			'templateUrl' : 'partials/edit-profile.html',
			'controller' : 'EditProfileController'
		}).
        when('/profile', {
            'templateUrl' : 'partials/profile.html',
            'controller' : 'ProfileController'
        }).
        when('/account', {
            'templateUrl' : 'partials/account.html',
            'controller' : 'AccountController'
        }).
        when('/account-host', {
            'templateUrl' : 'partials/account-host.html',
            'controller' : 'AccountController'
        }).
        when('/confirmation', {
            'templateUrl' : 'partials/confirmation.html',
            'controller' : 'ConfirmationController'
        }).
        when('/confirm', {
            'templateUrl' : 'partials/confirm.html',
            'controller' : 'ConfirmController'
        }).
        when('/discover', {
            'templateUrl' : 'partials/discover.html',
            'controller' : 'DiscoverController'
        }).
        when('/faq', {
            'templateUrl' : 'partials/FAQ.html',
            'controller' : 'FAQController'
        }).
        otherwise({
            'redirectTo': '/home'
        });
	}]);
