angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window','userService','$location','$state','$route'];

function loginController($scope,$http,$window,userService,$location,$state,$route){
    $scope.login = function(){
        let email = $('#emailUser').val();
        let pass = $('#passwordUser').val();
        // localStorage.setItem('emailHost', email);
        userService.login(email,pass)
        .success(function(data, status, header, config){
          console.log(data);
            localStorage.setItem('emailHost', email);
            localStorage.setItem('idHost', data.idHost);
            localStorage.setItem('session', data.session);
            sessionStorage.setItem("activeTab", 1);
            console.log(data);
            $state.go('home', {}).then(function() {
              console.log("state go home");
              window.location.reload();
            });
            //$state.go('home');
        }).error(function(data, status, header, config){
            console.log(data.message);
        });
    }
};
