angular.module("app.login",["app.service"])
       .controller("LoginController",loginController);

loginController.$inject = ['$scope','$http', '$window','userService','$location','$state','$route','authService'];

function loginController($scope,$http,$window,userService,$location,$state,$route,authService){
    $scope.login = function(){
        $(".loading").removeClass("hidden");
        var email = $('#emailUser').val();
        var pass = $('#passwordUser').val();

        var session = authService.generateSession();
        userService.login(email,pass)
        .then(function(response){
          console.log(response.data);
          if(response.data.message == "invalid password"){
            $(".loading").addClass("hidden");
            swal("Oops","Invalid Credentials","error");
          }else if(response.data.uniqueCode == undefined || response.data.uniqueCode == null || response.data.uniqueCode == ""){
            localStorage.setItem('emailHost', email);
            localStorage.setItem('idHost', response.data.idHost);
            localStorage.setItem('session', response.data.session);
            sessionStorage.setItem("activeTab", 1);

            userService.getAccount(response.data.idHost).then(function(response){
              if(response.data.content[0].about == null || response.data.content[0].about == ""){
                setTimeout(
                  $state.go('account',{}).then(function(){
                    window.location.reload();
                  }), 2000
                )
              } else {
                setTimeout(
                  $state.go('home', {}).then(function(){
                    window.location.reload();
                  }), 2000
                )
            }
          });

        } else {
            $(".loading").addClass("hidden");
            swal({
              title:'Attention!',
              html: 'Please use this link for activation first! <a href="http://www.sidekeek.co/#/confirmation/' + response.data.uniqueCode + '">Click Here </a>'
            });
          }

        });
    }
};
