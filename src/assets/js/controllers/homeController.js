angular.module("app.home",["app.service"])
      .controller("HomeController",homeController);

homeController.$inject = ['$scope',"$http","$uibModal","summaryService","searchService"];

function homeController($scope,$http,$uibModal,summaryService,searchService){
  summaryService.getCategories().then(function(response){
      $scope.categoriesData = response.data;
  },function(response){
      console.log(response.data.message);
  });

  summaryService.getProvince().then(function(response){
      $scope.provinceData = response.data;
  },function(response){
      console.log(response.data.message);
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

    searchService.searchTemplate(searchData).then(function(response){
      console.log(response.data);
      if (response.data.error == "success"){
        if(response.data.content.hosts.length > 0 || response.data.content.products.length > 0){
          $scope.hosts = response.data.content.hosts;
          $scope.products = response.data.content.products;
          console.log(response.data);
          searchService.setTempSearch(response.data);
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
