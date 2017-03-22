angular.module('app.confirmation',[])

.controller('ConfirmationController',confirmationController);

confirmationController.$inject = ['$scope', '$http', '$state','$stateParams','userService','authService','$timeout'];

function confirmationController($scope, $http, $state, $stateParams, userService, authService,$timeout){
  authService.getToken().then(function(response) {
    authService.setToken(response.data.token);
    userService.confirmAccount($stateParams.uq).then(function(response){
      console.log(response);
      if (response.data.error != undefined){

      }
        authService.setToken(response.data.token);
        localStorage.setItem('session', response.data.session);
        localStorage.setItem('emailHost', response.data.email);
        localStorage.setItem('idHost', response.data.idHost);

        if (response.data.idHost == null) {
          localStorage.setItem('tipeMember', 0);
          $timeout(
            function(){
              $state.go("home")
            }, 2000
          );
        }else{
          localStorage.setItem('tipeMember', 1);
          $timeout(
            function(){
              $state.go("account-host")  
            }, 2000
          );
        }
    },function(response){
        console.log(response.data.message);
    });
  })
};
