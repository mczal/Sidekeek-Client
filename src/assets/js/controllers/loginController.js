angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window','userService','$location','$state','$route','authService'];

function loginController($scope,$http,$window,userService,$location,$state,$route,authService){
    $scope.login = function(){
        let email = $('#emailUser').val();
        let pass = $('#passwordUser').val();

        let session = authService.generateSession();
        userService.login(email,pass)
        .then(function(response){
          console.log(response.data);
          if(response.data.uniqueCode == undefined){
            localStorage.setItem('emailHost', email);
            localStorage.setItem('idHost', response.data.idHost);
            localStorage.setItem('session', response.data.session);
            sessionStorage.setItem("activeTab", 1);

            userService.getAccount(response.data.idHost).then(function(response){
              if(response.data.about == null || response.data.about == ""){
                $state.go('account');
              }else{
                $state.go('home');
            }
          });

          }else{
            swal({
              title:'Attention!',
              html: 'Please use this link for activation first! <a href="http://www.sidekeek.co/#/confirmation/' + data.uniqueCode + '">Click Here </a>'

            });
          }

        },function(response){
            console.log(response.data.message);
        });
    }
};
