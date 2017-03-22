angular.module("app.confirm",[])
       .controller('ConfirmController', confirmController);

confirmController.$inject = ['$scope', '$http', '$state','$timeout'];

function confirmController($scope, $http, $state, $timeout){
  $timeout(
    function() {
      $state.go("home");
    }, 3000
  )
};
