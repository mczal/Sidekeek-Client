angular.module("app.discover",['app.service'])
   .controller("DiscoverController",discoverController);

discoverController.$inject = ["$scope","$http","$uibModal",'uiService','searchService'];

function discoverController($scope, $http, $uibModal,uiService,searchService){

  $scope.goSearch = function(){
    // let searchData = {
    //   tipe:$("#tipeSearch").prop('selectedIndex'),
    //   categories:$("#catSearch").prop('selectedIndex'),
    //   location: $("#locSearch").prop('selectedIndex'),
    //   query:$("#querySearch").val()
    // };

    let searchData = {
      tipe:null,
      categories:null,
      location:null,
      query:$("#querySearch").val()
    };

    console.log(searchData);
    console.log(searchData.query);

    searchService.searchTemplate(searchData).success(function(data){
      if (data.error == "success"){
        $scope.hosts = data.content.hosts;
        $scope.products = data.content.products;
        console.log($scope.hosts[0].img_base64);
        console.log($scope.products[0]);

        console.log("success");
        console.log(data);
        console.log($scope.hosts);
        console.log($scope.products);
      }else{
        console.log("error");
        console.log(data);
      }

    });


  }


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
