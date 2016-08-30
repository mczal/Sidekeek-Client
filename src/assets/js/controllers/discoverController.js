angular.module("app.discover",['app.service'])
   .controller("DiscoverController",discoverController);

discoverController.$inject = ["$scope","$http","$uibModal",'uiService'];

function discoverController($scope, $http, $uibModal,uiService){
  $scope.contactus = function (size) {
      uiService.showModal(size,"contactus.html");
  };

  $scope.feedback = function (size) {
    uiService.showModal(size,"feedback.html");
  };

  $scope.support = function (size) {
    uiService.showModal(size,"support.html");
  };
};
