angular.module('app.confirmation',[])

.controller('ConfirmationController',confirmationController);

confirmationController.$inject = ['$scope', '$http', '$timeout', '$window', '$location'];

function confirmationController($scope, $http, $timeout, $window, $location){
  var unique = $location.search().uq;
  $http({
      method: 'POST',
      url: urlAPI + '/confirmation',
      headers:{
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: $.param({
          token: token,
          uniqueCode: unique
      })
  }).success(function(data){
      localStorage.setItem('session', data.session);
      localStorage.setItem('emailHost', data.email);
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
