angular.module("app.index",["app.service"])
       .controller('IndexController', IndexController);

IndexController.$inject = ['$scope', '$http','userService','summaryService','uiService','authService','$state'];

function IndexController($scope, $http,userService,summaryService,uiService,authService,$state){

  let count = 0;

  temp = localStorage.getItem('emailHost') + " ";
  namaUser = temp.split("@");
  $scope.namaUser = namaUser[0];
  if(localStorage.getItem('idHost') != null){
    $scope.idHost = localStorage.getItem('idHost');
  }else{
    $scope.idHost = null;
  }

  authService.getToken().then(function(data){
    if(data.error == "success"){
      let idHost = localStorage.getItem('idHost');
      authService.setToken(data.token);
      userService.getAccount(idHost)
      .then(function(data){
        console.log(data);
        if(data.error == 'error'){
          $('#btn-hide').removeClass('hide');//sign-up button
          $('.dropdown').removeClass('hide');//login button
          $('#img-acc').addClass('hide');//profile pict
          $scope.loggedIn = false;
        }else{
          $scope.loggedIn = true;
          $('#btn-hide').addClass('hide');
          $('.dropdown').addClass('hide');
          $('#loginBtn').addClass('hide');
          $('#img-acc').removeClass('hide');
        }
      },function(data){
          $('#btn-hide').removeClass('hide');//sign-up button
          $('.dropdown').removeClass('hide');//login button
          $('#img-acc').addClass('hide');//profile pict
          $scope.loggedIn = false;
          console.log(data.message);
      });

      // userService.integrityCheck().success(function(data, status, header, config){
      //   console.log(data);
      //     if (data.status == "forbidden" ) {
      //         $('#btn-hide').removeClass('hide');//sign-up button
      //         $('.dropdown').removeClass('hide');//login button
      //         $('#img-acc').addClass('hide');//profile pict
      //         $scope.loggedIn = false;
      //     }else{
      //         $scope.loggedIn = true;
      //         $('#btn-hide').addClass('hide');
      //         $('.dropdown').addClass('hide');
      //         $('#loginBtn').addClass('hide');
      //         $('#img-acc').removeClass('hide');
      //         let idHost = localStorage.getItem('idHost');
      //         userService.getAccount(idHost).success(function(data){
      //           $scope.img = data.content[0].img_base64;
      //         })
      //     }
      // }).error(function(data, status, header, config){
      //     console.log(data.message);
      // });

      summaryService.isHost().then(function(data){
          localStorage.setItem('tipeMember', data.code);
          if (data.code == 1) {
              $("#startHosting").hide();
          }else{
              $("#startHosting").show();
          }
      },function(data){
          console.log(data.message);
      });

      let uEmail = localStorage.getItem('emailHost');

      if (uEmail != null){
        let idHost = localStorage.getItem('idHost');
        $scope.idHost = idHost;
        userService.getAccount(idHost).success(function(data, status, header, config){
            if(data.error = "success"){
            }else{
            }
        })
      }
    } else {
      //console.log("Error");
      //alert("Error Connecting to API");
    }
  });


    $scope.checkHost = function(){
      sessionStorage.setItem('activeTab', 1);
        if (localStorage.getItem('tipeMember') == 0) {
            $scope.url = "edit-profile";
        }
    }

    // logout session
    $scope.logout = function(){
      //console.log("logout");
        userService.logout().then(function(data, status, header, config){
            //console.log(data);
            $scope.loggedIn = false;
            localStorage.clear();
            sessionStorage.clear();
            $state.go('home', {}).then(function() {
              //console.log("state go home");
              window.location.reload();
            });
            // window.location.reload();
            // $('#btn-hide').removeClass('hide');
            // $('.dropdown').removeClass('hide');
            // $('#img-acc').addClass('hide');
        },function(data, status, header, config){
            //console.log(data);
            //console.log(data.message);
        });
    }

    $scope.settings = function (size) {
        uiService.showModal(size,'settings.html');
    };
};
