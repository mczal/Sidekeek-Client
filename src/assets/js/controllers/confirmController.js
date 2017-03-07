angular.module("app.confirm",[])
       .controller('ConfirmController', confirmController);

confirmController.$inject = ['$scope', '$http', '$state'];

function confirmController($scope, $http, $state){
  setTimeout($state.go("home"),3000);
};
