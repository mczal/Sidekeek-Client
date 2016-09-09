angular.module("app.footer",['app.service','ui.bootstrap'])
       .controller("FooterController",footerController);

footerController.$inject = ['$scope','uiService','$uibModal'];

function footerController($scope,uiService,$uibModal){
  $scope.openModal = function(url){
     uiService.showModal(url);
  }

};
