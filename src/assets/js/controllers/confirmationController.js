angular.module('app.confirmation',[])

.controller('ConfirmationController',confirmationController);

confirmationController.$inject = ['$scope', '$http', '$state','$stateParams','userService','authService'];

function confirmationController($scope, $http, $state, $stateParams, userService, authService){
  authService.getToken().then(function(response) {
    authService.setToken(response.data.token);
    userService.confirmAccount(unique).then(function(response){
      console.log(response);
      if (response.data.error != undefined){

      }
        authService.setToken(response.data.token);
        localStorage.setItem('session', response.data.session);
        localStorage.setItem('emailHost', response.data.email);
        localStorage.setItem('idHost', response.data.idHost);

        if (response.data.idHost == null) {
          localStorage.setItem('tipeMember', 0);
          $state.go("home");
        }else{
          localStorage.setItem('tipeMember', 1);
          $state.go("account-host");
        }
    },function(data){
        console.log(data.message);
    });
  })
};
