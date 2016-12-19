angular.module('app.confirmation',[])

.controller('ConfirmationController',confirmationController);

confirmationController.$inject = ['$scope', '$http', '$timeout', '$window', '$location','$stateParams','userService','authService'];

function confirmationController($scope, $http, $timeout, $window, $location,$stateParams,userService,authService){
  var unique = $stateParams.uq;
  userService.confirmAccount(unique).success(function(data){
    console.log(data);
    if (data.error != undefined){

    }
      localStorage.setItem('session', data.session);
      localStorage.setItem('emailHost', data.email);
      localStorage.setItem('idHost', data.idHost);
      authService.setToken(data.token);
      var redirectTimeout;
      if (localStorage.getItem('tipeMember') == 0) {
          var redirect = function(){
              $window.location.href = '#/home'
              $window.location.reload();
          }
      }else{
          var redirect = function(){
              $window.location.href = '#/account-host'
              $window.location.reload();
          }
      }
      // var redirect = function() {
      //     if (localStorage.getItem('tipeMember') == 0) {
      //         $window.location.href = '#/home'
      //         $window.location.reload();
      //     }else{
      //         $window.location.href = '#/account-temp'
      //         $window.location.reload();
      //     }
      // }
      $timeout.cancel(redirectTimeout);
      redirectTimeout = $timeout(function() {
          var timeoutTime = 5000;
          redirectTimeout = $timeout(redirect, timeoutTime);
      });
  }).error(function(data){
      console.log(data.message);
  });
};
