var sidekeekApp = angular.module('sidekeekApp', [
    'ngSanitize',
    'naif.base64',
    'angular-img-cropper',
    'mgcrea.bootstrap.affix',
    'angulartics',
    'angulartics.google.analytics',
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
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
    'app.footer',
]);
sidekeekApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            views:{
              '':{
                  templateUrl: './src/partials/home.html',
                  controller:'HomeController'
                },
              'footer@home' :{
                  templateUrl: './src/partials/footer.html',
                  controller:'FooterController'
                }
            }
        })
        .state('start-host',{
          url:'/start-host',
          views:{
            '':{
              templateUrl:'./src/partials/start-host.html',
              controller: 'StartController'
            }
          }

        })
        .state('next-start',{
          url: '/next-start',
          views:{
            '':{
              templateUrl: './src/partials/next-start.html',
              controller: 'StartController'
            }
          }
        })
        .state('sign-up',{
          url:'/sign-up',
          views:{
            '':{
              templateUrl: './src/partials/sign-up.html',
              controller:'SignUpController'
            }
          }
        })

        .state('login',{
          url:'/login',
          views:{
            '':{
              templateUrl:'./src/partials/login.html',
              controller:'LoginController'
            }
          }
        })
        .state('edit-profile-host',{
          url:'/edit-profile-host',
          views:{
            '':{
              templateUrl:'./src/partials/edit-profile-host.html',
              controller:'EditProfileController'
            }
          }
        })
        .state('edit-profile',{
          url:'/edit-profile',
          views:{
            '':{
              templateUrl:'./src/partials/edit-profile.html',
              controller:'EditProfileController'
            }
          }
        })
        .state('profile',{
          url:'/profile/:idHost/:type',
          views:{
            '':{
              templateUrl:'./src/partials/profile.html',
              controller:'ProfileController'
            }
          }
        })
        .state('account',{
          url:'/account',
          views:{
            '':{
              templateUrl:'./src/partials/account.html',
              controller:'AccountController'
            }
          }
        })
        .state('account-host',{
          url:'/account-host',
          views:{
            '':{
              templateUrl:'./src/partials/account-host.html',
              controller:'AccountController'
            }
          }
        })
        .state('confirmation',{
          url:'/confirmation/:uq',
          views:{
            '':{
              templateUrl:'./src/partials/confirmation.html',
              controller:'ConfirmationController'
            }
          }
        })
        .state('confirm',{
          url:'/confirm',
          views:{
            '':{
              templateUrl:'./src/partials/confirm.html',
              controller:'ConfirmController'
            }
          }
        })
        .state('discover',{
          url:'/discover',
          views:{
            '':{
              templateUrl:'./src/partials/discover.html',
              controller:'DiscoverController'
            }
          }
        })
        .state('rules-regulations',{
          url:'/rules-regulations',
          views:{
            '':{
              templateUrl:'./src/partials/rules_regulations.html',
              controller:'RulesRegulationsController'
            },
            'footer@rules-regulations': {
                templateUrl: './src/partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('community-guidelines',{
          url:'/community-guidelines',
          views:{
            '':{
              templateUrl:'./src/partials/community_guidelines.html',
              controller:'CommunityGuidelinesController'
            },
            'footer@community-guidelines': {
                templateUrl: './src/partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('about-us',{
          url:'/about-us',
          views:{
            '':{
              templateUrl:'./src/partials/aboutus.html',
              controller:'AboutUsController'
            },
            'footer@about-us': {
                templateUrl: './src/partials/footer.html',
                controller:'FooterController'
            }
          }
        })
        .state('faq',{
          url:'/faq',
          views:{
            '':{
              templateUrl:'./src/partials/FAQ.html',
              controller:'FAQController'
            },
            'footer@faq' :{
              templateUrl: './src/partials/footer.html',
              controller:'FooterController'
            }
          }
        })

}); // closes $routerApp.config()
