//CHECK FIRST_REGISTER and SECOND_REGISTER

angular.module("app.start",['app.service'])
       .controller('StartController',startController);

startController.$inject = ['$scope','$http','summaryService'];

function startController($scope, $http, summaryService){

  $('#button-goods').hide();
  $('#button-service').hide();

  summaryService.getCategories().success(function(data, status, header, config){
      $scope.categoriesData = data;
  }).error(function(data, status, header, config){
      console.log(data.message);
  });

  var idTipe = null;
  $scope.serviceGoodOnClick = function(id){
      if(id==1){
          sessionStorage.setItem('idTipeProfile','1');
          idTipe = "goods";
          $('#button-goods').show();
          $('#button-service').hide();
      }else{
          idTipe = "services";
          $('#button-goods').hide();
          $('#button-service').show();
      }
  }

  $scope.submitFirst = function(){
      localStorage.setItem('statTemp', generateUniqueCode());
      $http({
          url : credentials.url +'/firstRegister',
          method : 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          data:$.param({
              token : token,
              tipe : idTipe,
              statTemp : localStorage.getItem('statTemp')
          })
      }).success(function(data, status, header, config){
          console.log(data.message + " " + idTipe);
          //
      }).error(function(data, status, header, config){
          console.log(data.message);
      });
  }

  $scope.submit = function(){
      var categories = $scope.form.categories;
      var company = $scope.form.company;
      var thread = $scope.form.thread;
      $http({
          url : urlAPI + '/secondRegister',
          method : 'POST',
          headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
          data : $.param({
              token : token,
              cat : categories,
              statTemp : localStorage.getItem('statTemp'),
              compTitle : company,
              threadTitle : thread
          })
      }).success(function(data, status, header, config){
          console.log(data.message);
      }).error(function(data, statuc, header, config){
          console.log(data.message);
      });
  }
};
