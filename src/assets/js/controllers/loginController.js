angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window','userService','$location'];

function loginController($scope,$http,$window,userService,$location){
    $scope.login = function(){
        let email = $('#emailUser').val();
        let pass = $('#passwordUser').val();
        localStorage.setItem('emailHost', email);
        userService.login(email,pass)
        .success(function(data, status, header, config){
          console.log(data);
            localStorage.setItem('session', data.session);
            sessionStorage.setItem("activeTab", 1);
            console.log(data);
            $location.path('/home');
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    }
};
