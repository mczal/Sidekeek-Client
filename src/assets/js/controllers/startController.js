//CHECK FIRST_REGISTER and SECOND_REGISTER

angular.module("app.start",['app.service'])
       .controller('StartController',startController);

startController.$inject = ['$scope','$http','summaryService','generalSerivce','registerService','$state'];

function startController($scope, $http, summaryService,generalSerivce,registerService,$state){

  $('#button-goods').hide();
  $('#button-service').hide();

  summaryService.getCategories().then(function(response){
      $scope.categoriesData = response.data;
  },function(response){
      console.log(response.data.message);
  });

  var idTipe = null;
  $scope.serviceGoodOnClick = function(id){
    console.log(id);
      if(id==1){
          idTipe = 1;
          $('#button-goods').show();
          $('#button-service').hide();
      }else{
          idTipe = 2;
          $('#button-goods').hide();
          $('#button-service').show();
      }
  }

  $scope.submitFirst = function(){
      sessionStorage.setItem('idTipe',idTipe);
      sessionStorage.setItem('statTemp', generalSerivce.generateUniqueCode());
  }

  $scope.submit = function(){
      var registerData={};
      var idCat = $("#idCat").prop('selectedIndex');

      registerData.statTemp = sessionStorage.getItem('statTemp');
      registerData.idTemp = sessionStorage.getItem('idTipe');
      registerData.categories = String(idCat);
      registerData.company = $scope.form.company;
      registerData.thread = $scope.form.thread;

      console.log(registerData);
      registerService.saveRegisterData(registerData);

      console.log("complete registerData");
      $state.go('sign-up');

      // $http({
      //     url : urlAPI + '/secondRegister',
      //     method : 'POST',
      //     headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
      //     data : $.param({
      //         token : token,
      //         cat : categories,
      //         statTemp : localStorage.getItem('statTemp'),
      //         compTitle : company,
      //         threadTitle : thread
      //     })
      // }).success(function(data, status, header, config){
      //     console.log(data.message);
      // }).error(function(data, statuc, header, config){
      //     console.log(data.message);
      // });
  }
};
