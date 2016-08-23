angular.module("app.signup",["app.service"])
       .controller("SignUpController",signUpController);

signUpController.$inject = ['$scope','$http','$window','userService'];

function signUpController($scope, $http, $window, userService){
   $scope.signUp = function(){
       let email = $scope.form.email;
       let pass = $scope.form.password;
       let confirm = $scope.form.confirmation;
       userService.signup(email,pass,confirm).success(function(data, status, header, config){
           console.log(data.message);
           $window.location.href = '#/confirm';
       }).error(function(data, status, header, config){
           console.log(data);
       });
   }
};
