angular.module('app.confirmation',[])

.controller('ConfirmationController',confirmationController);

confirmationController.$inject = ['$scope', '$http', '$state', '$stateParams','userService','authService'];

function confirmationController($scope, $http, $state, $stateParams, userService, authService){
  authService.getToken().then(function(data) {
    authService.setToken(data.token);

    userService.confirmAccount($stateParams.uq).then(function(data){
      if (data.error != undefined){
        console.log(data);
        debugger;
      }

      localStorage.setItem('session', data.session);
      localStorage.setItem('emailHost', data.email);
      localStorage.setItem('idHost', data.idHost);
      authService.setToken(data.token);

      if (localStorage.getItem('tipeMember') == 0) {
        $state.go("home");
      } else {
        $state.go("account-host");
      }

    },function(data){
        console.log(data.message);
    });
  })
};
