var sidekeekApp = angular.module('sidekeekApp', [
    'app.service',
    'app.index',
    'app.login',
    'app.faq',
    'app.discover',
    'app.home',
    'app.signup',
    'app.account',
    'app.profile',
    'app.editProfile',
    'app.confirm',
    'app.confirmation',
    'app.start',
    'app.rule',
    'app.community',
    'app.aboutus',
    'ui.bootstrap',
    'ui.router',
    'app.footer',
	'ngRoute',
    'ngSanitize',
    'naif.base64',
    'angular-img-cropper',
    'mgcrea.bootstrap.affix'
]);
sidekeekApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            views:{
              '':{
                  templateUrl: 'partials/home.html',
                  controller:'HomeController'
                },
              'footer@home' :{
                  templateUrl: 'partials/footer.html',
                  controller:'FooterController'
                }
            }
        })
        .state('start-host',{
          url:'/start-host',
          views:{
            '':{
              templateUrl:'partials/start-host.html',
              controller: 'StartController'
            }
          }

        })
        .state('next-start',{
          url: '/next-start',
          views:{
            '':{
              templateUrl: 'partials/next-start.html',
              controller: 'StartController'
            }
          }
        })
        .state('sign-up',{
          url:'/sign-up',
          views:{
            '':{
              templateUrl: 'partials/sign-up.html',
              controller:'SignUpController'
            }
          }
        })

        .state('login',{
          url:'/login',
          views:{
            '':{
              templateUrl:'partials/login.html',
              controller:'LoginController'
            }
          }
        })
        .state('edit-profile-host',{
          url:'/edit-profile-host',
          views:{
            '':{
              templateUrl:'partials/edit-profile-host.html',
              controller:'EditProfileController'
            }
          }
        })
        .state('edit-profile',{
          url:'/edit-profile',
          views:{
            '':{
              templateUrl:'partials/edit-profile.html',
              controller:'EditProfileController'
            }
          }
        })
        .state('profile',{
          url:'/profile/:idHost/:type',
          views:{
            '':{
              templateUrl:'partials/profile.html',
              controller:'ProfileController'
            }
          }
        })
        .state('account',{
          url:'/account',
          views:{
            '':{
              templateUrl:'partials/account.html',
              controller:'AccountController'
            }
          }
        })
        .state('account-host',{
          url:'/account-host',
          views:{
            '':{
              templateUrl:'partials/acccount-host.html',
              controller:'AvvountController'
            }
          }
        })
        .state('confirmation',{
          url:'/confirmation',
          views:{
            '':{
              templateUrl:'partials/confirmation.html',
              controller:'ConfirmationController'
            }
          }
        })
        .state('confirm',{
          url:'/confirm',
          views:{
            '':{
              templateUrl:'partials/confirm.html',
              controller:'ConfirmController'
            }
          }
        })
        .state('discover',{
          url:'/discover',
          views:{
            '':{
              templateUrl:'partials/discover.html',
              controller:'DiscoverController'
            }
          }
        })
        .state('rules-regulations',{
          url:'/rules-regulations',
          views:{
            '':{
              templateUrl:'partials/rules_regulations.html',
              controller:'RulesRegulationsController'
            },
            'footer@rules-regulations': {
                templateUrl: 'partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('community-guidelines',{
          url:'/community-guidelines',
          views:{
            '':{
              templateUrl:'partials/community_guidelines.html',
              controller:'CommunityGuidelinesController'
            },
            'footer@community-guidelines': {
                templateUrl: 'partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('about-us',{
          url:'/about-us',
          views:{
            '':{
              templateUrl:'partials/aboutus.html',
              controller:'AboutUsController'
            },
            'footer@about-us': {
                templateUrl: 'partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('faq',{
          url:'/faq',
          views:{
            '':{
              templateUrl:'partials/FAQ.html',
              controller:'FAQController'
            },
            'footer@faq' :{
              templateUrl: 'partials/footer.html',
              controller:'FooterController'
            }
          }
        })

}); // closes $routerApp.config()
