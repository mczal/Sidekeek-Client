angular.module("app.home",["app.service"])
      .controller("HomeController",homeController);

homeController.$inject = ['$scope',"$http","$uibModal","summaryService"];

function homeController($scope,$http,$uibModal,summaryService){
  summaryService.getCategories().success(function(data, status, header, config){
      $scope.categoriesData = data;
  }).error(function(data, status, header, config){
      console.log(data.message);
  });

  summaryService.getProvince().success(function(data, status, header, config){
      $scope.provinceData = data;
  }).error(function(data, status, header, config){
      console.log(data.message);
  });

  $scope.contactus = function (size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'contactus.html',
        size: size
      });
  };

  $scope.feedback = function (size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'feedback.html',
        size: size
      });
  };
};
