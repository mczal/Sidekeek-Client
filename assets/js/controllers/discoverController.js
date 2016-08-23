angular.module("app.discover",['app.service'])
   .controller("DiscoverController",discoverController);

discoverController.$inject = ["$scope","$http","$uibModal",'uiService'];

function discoverController($scope, $http, $uibModal,uiService){
  $scope.contactus = function (size) {
      let url = "contactus.html";
      uiService.showModal(size,url);
  };

  $scope.feedback = function (size) {
    let url = "feedback.html";
    uiService.showModal(size,url);
  };

  $scope.support = function (size) {
    let url = "support.html";
    uiService.showModal(size,url);
  };
};
