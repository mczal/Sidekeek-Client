angular.module("app.index",["app.service"])
       .controller('IndexController', IndexController);

IndexController.$inject = ['$scope', '$http','userService','summaryService','uiService','authService','$state'];

function IndexController($scope, $http,userService,summaryService,uiService,authService,$state){

  let count = 0;

  temp = localStorage.getItem('emailHost') + " ";
  namaUser = temp.split("@");
  $scope.namaUser = namaUser[0];

  $scope.url = "start-host";

  authService.getToken().success(function(data){
    console.log("Connected to API");
    if(data.error == "success"){
      console.log("Token Success");
      console.log(data);
      //credentials.token = data.token;
      // console.log("AAAA :   " + credentials.token);
      authService.setToken(data.token);
      //check if the session is still available
      userService.integrityCheck().success(function(data, status, header, config){
          if (data.status == "forbidden" ) {
              $('#btn-hide').removeClass('hide');//sign-up button
              $('.dropdown').removeClass('hide');//login button
              $('#img-acc').addClass('hide');//profile pict
          }else{
              $('#btn-hide').addClass('hide');
              $('.dropdown').addClass('hide');
              $('#loginBtn').addClass('hide');
              $('#img-acc').removeClass('hide');
          }
      }).error(function(data, status, header, config){
          console.log(data.message);
      });

      summaryService.isHost().success(function(data){
          localStorage.setItem('tipeMember', data.code);
          if (data.code == 1) {
              $("#startHosting").hide();
          }else{
              $("#startHosting").show();
          }
      }).error(function(data){
          console.log(data.message);
      });

      let uEmail = localStorage.getItem('emailHost');

      if (uEmail != null){
        let idHost = localStorage.getItem('idHost');
        $scope.idHost = idHost;
        userService.getAccount(idHost).success(function(data, status, header, config){
            console.log(data);
            if(data.error = "success"){
              console.log("success");
              console.log(data);
            }else{
              console.log("error Get Account Data")
              console.log(data);
              console.log(data.message);
            }
        })
      }
    } else {
      console.log("Error");
      alert("Error Connecting to API");
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
      console.log("logout");
        userService.logout().success(function(data, status, header, config){
            console.log(data);
            localStorage.clear();
            sessionStorage.clear();
            $state.go('home', {}).then(function() {
              console.log("state go home");
              window.location.reload();
            });
            // window.location.reload();
            // $('#btn-hide').removeClass('hide');
            // $('.dropdown').removeClass('hide');
            // $('#img-acc').addClass('hide');
        }).error(function(data, status, header, config){
            console.log(data);
            console.log(data.message);
        });
    }

    $scope.settings = function (size) {
        uiService.showModal(size,'settings.html');
    };
};
