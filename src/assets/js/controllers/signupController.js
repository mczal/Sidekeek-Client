angular.module("app.signup",["app.service"])
       .controller("SignUpController",signUpController);

signUpController.$inject = ['$scope','$http','$window','userService','registerService','authService','$state'];

function signUpController($scope, $http, $window, userService,registerService,authService,$state){
   $scope.signUp = function(){
       let email = $scope.form.email;
       let pass = $scope.form.password;
       let confirm = $scope.form.confirmation;
       authService.getToken().then(function(response){
         console.log(response.data);
         if(response.data.error == "success"){
           authService.setToken(response.data.token);
           let regData = registerService.getRegisterData();
           console.log(regData);
           if(regData == null){
             userService.signup(email,pass,confirm).then(function(response){
               $(".loading").removeClass("hidden");
               if(response.data.error == "success"){
                 console.log(response.data.message);
                 //$window.location.href = '#/confirm';
                 $state.go('confirm');
               }else{
                 $(".loading").addClass("hidden");
                 swal("Oops!",response.data.message,"error");
                 console.log(response);
               }
             },function(response){
                 console.log(response.data);
             });
           }else{
             regData.email = email;
             regData.password = pass;
             regData.confirm = confirm;

             console.log(regData)
             userService.hostSignup(regData).then(function(response){
                 console.log(response.data);
                 registerService.clearRegisterData();
                 $state.go('confirm');
             },function(response){
                 console.log(response.data);
             });
           }
         }else{
           console.log("error get token");
         }

       });
   }
};
