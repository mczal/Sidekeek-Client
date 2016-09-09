angular.module("app.footer",['app.service'])
       .controller("FooterController",footerController);

footerController.$inject = ['$scope','uiService'];

function footerController($scope, $http, uiService){
  console.log("footer Hello");

};
