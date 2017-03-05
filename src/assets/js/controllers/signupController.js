angular.module("app.signup",["app.service"])
       .controller("SignUpController",signUpController);

signUpController.$inject = ['$scope','$http','$window','userService','registerService','authService','$state'];

function signUpController($scope, $http, $window, userService,registerService,authService,$state){
   $scope.signUp = function(){
       let email = $scope.form.email;
       let pass = $scope.form.password;
       let confirm = $scope.form.confirmation;
       authService.getToken().then(function(data){
         console.log(data);
         if(data.error == "success"){
           authService.setToken(data.token);
           let regData = registerService.getRegisterData();
           console.log(regData);
           if(regData == null){
             userService.signup(email,pass,confirm).success(function(data, status, header, config){
                 console.log(data.message);
                 //$window.location.href = '#/confirm';
                 $state.go('confirm');
             },function(data, status, header, config){
                 console.log(data);
             });
           }else{
             regData.email = email;
             regData.password = pass;
             regData.confirm = confirm;

             console.log(regData)
             userService.hostSignup(regData).then(function(data, status, header, config){
                 console.log(data);
                 registerService.clearRegisterData();
                 $state.go('confirm');
             },function(data, status, header, config){
                 console.log(data);
             });
           }
         }else{
           console.log("error get token");
         }

       });
   }
};
