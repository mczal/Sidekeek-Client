angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window','userService','$location','$state','$route','authService'];

function loginController($scope,$http,$window,userService,$location,$state,$route,authService){
    $scope.login = function(){
        let email = $('#emailUser').val();
        let pass = $('#passwordUser').val();
        // localStorage.setItem('emailHost', email);
        let session = authService.generateSession();
        userService.login(email,pass)
        .then(function(data, status, header, config){
          console.log(data);
          if(data.uniqueCode == undefined){
            localStorage.setItem('emailHost', email);
            localStorage.setItem('idHost', data.idHost);
            localStorage.setItem('session', data.session);
            sessionStorage.setItem("activeTab", 1);
            $state.go('home', {}).then(function() {
              console.log("state go home");
              window.location.reload();
            });
            //$state.go('home');
          }else{
            swal({
              title:'Attention!',
              html: 'Please use this link for activation first! <a href="http://www.sidekeek.co/#/confirmation/' + data.uniqueCode + '">Click Here </a>'

            });
          }

        },function(data, status, header, config){
            console.log(data.message);
        });
    }
};
