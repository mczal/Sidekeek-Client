angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window'];

function loginController($scope,$http,$window){
    $scope.login = function(){
        let email = $('#emailUser').val();
        let pass = $('#passwordUser').val();
        localStorage.setItem('emailHost', email);
      userService.login(email,pass).success(function(data, status, header, config){
            localStorage.setItem('session', data.session);
            sessionStorage.setItem("activeTab", 1);
            console.log(data);
            //$window.location.reload();
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    }
};
