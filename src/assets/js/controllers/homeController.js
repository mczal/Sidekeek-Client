angular.module("app.home",["app.service"])
      .controller("HomeController",homeController);

homeController.$inject = ['$scope',"$http","$uibModal","summaryService","searchService"];

function homeController($scope,$http,$uibModal,summaryService,searchService){
  summaryService.getCategories().then(function(data, status, header, config){
      $scope.categoriesData = data;
  },function(data, status, header, config){
      console.log(data.message);
  });

  summaryService.getProvince().then(function(data, status, header, config){
      $scope.provinceData = data;
  },function(data, status, header, config){
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

  $scope.startSearch = function(){
    var searchData = {
      tipe:$('#search-tipe').prop('selectedIndex'),
      categories:$('#search-cat').prop('selectedIndex'),
      location:$('#search-loc').prop('selectedIndex'),
      query:$('#search-query').val()
    }

    console.log(searchData);

    searchService.searchTemplate(searchData).then(function(data){
      console.log(data);
      if (data.error == "success"){
        if(data.content.hosts.length > 0 || data.content.products.length > 0){
          $scope.hosts = data.content.hosts;
          $scope.products = data.content.products;
          console.log(data);
          searchService.setTempSearch(data);
          $state.go('discover');
        } else {
          swal('Oops!','No data found, please try another query.','error');
          searchService.setTempSearch(null);
        }
      } else {
        console.log("error");
        console.log(data);
        searchService.setTempSearch(null);
      }

    });
  }

  $('#search-query').keyup(function(e){
    if(e.keyCode == 13) {
      $scope.startSearch();
    }
  });


};
